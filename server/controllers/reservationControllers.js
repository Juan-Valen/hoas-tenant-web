const Item = require('../models/itemModel');
const Space = require('../models/spaceModel');
const Reservation = require('../models/reservationModel');
const mongoose = require('mongoose');
const User = require('../models/userModel');



// GET /api/reservations
const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({}).sort({ createdAt: -1 });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: ("failed to retrieve reservations: " + error.message) });
    }
};

// POST /api/reservables
const getReservables = async (req, res) => {
    const { type } = req.body;
    try {
        var reservables;
        if (type == "sauna" || type == "clubroom") {
            reservables = await Space.find({ type: type, reservable: true }, "_id identifier maintenance").sort({ createdAt: -1 });
        }
        if (type == "washing machine" || type == "dryer") {
            reservables = await Item.find({ type: type, reservable: true }, "_id identifier maintenance").sort({ createdAt: -1 });
        }
        res.status(200).json(reservables);
    } catch (error) {
        res.status(500).json({ message: ("failed to retrieve reservations: " + error.message) });
    }
};

// POST /api/reservations
const createReservation = async (req, res) => {
    try {
        const { start, end, reserved_type, reserved_by, reserved_id } = req.body;

        // Convert to Date objects
        const requestedStart = new Date(start);
        const requestedEnd = new Date(end);

        if (requestedEnd <= requestedStart) {
            return res.status(400).json({ message: "End time must be after start time" });
        }

        // Check for overlapping reservations
        const conflict = await Reservation.findOne({
            reserved_id: reserved_id,
            reserved_type,
            $or: [
                { start: { $lt: requestedEnd }, end: { $gt: requestedStart } }, // any overlap
                { start: { $lte: requestedStart }, end: { $gte: requestedEnd } } // exactly covers or contains
            ]
        });


        if (conflict) {
            console.log(conflict)
            return res.status(400).json({ message: "Time slot already booked" });
        }

        // Create reservation
        const newReservation = await Reservation.create({
            start: requestedStart,
            end: requestedEnd,
            reserved_type,
            reserved_by,
            reserved_id
        });

        res.status(201).json(newReservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// GET /api/reservations/:id
const getReservationById = async (req, res) => {
    const { reservationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(reservationId)) {
        return res.status(400).json({ message: `Invalid reservation ID: ${reservationId}` });
    }

    try {
        const reservation = await Reservation.findById(reservationId);
        if (reservation) {
            res.status(200).json(reservation);
        } else {
            res.status(404).json({ message: "Reservation not found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error, failed to retrieve reservation" });
    }
};

// GET /api/reservations/users/:userId
const getReservationByUserId = async (req, res) => {
    const { userId } = req.params;
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setMilliseconds(0);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: `Invalid reservation ID: ${userId}` });
    }

    try {
        const user = await User.findById(userId);
        var reservations;
        if (user) {
            reservations = await Reservation
                .find({
                    reserved_by: user._id,
                    end: { $gt: today }
                })
                .populate('reserved_id', '_id identifier location type')
                .sort({ createdAt: -1 });
        }
        if (reservations) {
            res.status(200).json(reservations);
        } else {
            res.status(404).json({ message: "Reservation not found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error, failed to retrieve reservation" });
    }
};

// PUT /api/reservations/:id
const updateReservation = async (req, res) => {
    const { reservationId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(reservationId)) {
        return res.status(400).json({ message: `Invalid reservation ID: ${reservationId}` });
    }

    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            { _id: reservationId },
            { ...req.body },
            { new: true }
        );
        if (updatedReservation) {
            res.status(200).json(updatedReservation);
        } else {
            res.status(404).json({ message: "Reservation not found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error, failed to update reservation" });
    }
};

// DELETE /api/reservations/:id
const deleteReservation = async (req, res) => {
    const { reservationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(reservationId)) {
        return res.status(400).json({ message: `Invalid reservation ID: ${reservationId}` });
    }

    try {
        const deletedReservation = await Reservation.findByIdAndDelete(reservationId);
        if (deletedReservation) {
            res.status(200).json({ message: "Reservation deleted successfully" });
        } else {
            res.status(404).json({ message: "Reservation not found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error, failed to delete reservation" });
    }
};

// GET /api/reservations/freeslots/:reserved_id/:start/:end
const getReservedSlots = async (req, res) => {
    const { reserved_id } = req.params;
    const { start, end } = req.body

    const startTime = new Date(start);
    const endTime = new Date(end);

    if (startTime >= endTime) {
        return res.status(400).json({ message: "Start time must be before end time" });
    }


    try {
        const reservations = await Reservation.find({
            reserved_id: reserved_id,
            start: { $lt: endTime },
            end: { $gt: startTime }
        }).sort('start');

        let fullSlots = [];

        for (let r of reservations) {
            fullSlots.push({ begins: new Date(r.start), ends: new Date(r.end) })
        }

        res.status(200).json(fullSlots);
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error}, failed to retrieve free slots` });
    }
};

module.exports = {
    getAllReservations,
    getReservables,
    createReservation,
    getReservationById,
    getReservationByUserId,
    updateReservation,
    deleteReservation,
    getReservedSlots
};
