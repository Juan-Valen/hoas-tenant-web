const Reservation = require('../models/reservationModel');
const mongoose = require('mongoose');



// GET /api/reservations
const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({}).sort({ createdAt: -1 });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: ("failed to retrieve reservations: " + error.message) });
    }
};

// POST /api/reservations
const createReservation = async (req, res) => {
    try {
        const { start, end, reserved_by, reserved_id } = req.body;

        // Convert to Date objects
        const requestedStart = new Date(start);
        const requestedEnd = new Date(end);

        if (requestedEnd <= requestedStart) {
            return res.status(400).json({ message: "End time must be after start time" });
        }

        // Check for overlapping reservations
        const conflict = await Reservation.findOne({
            $or: [
                { start: { $lt: requestedEnd }, end: { $gt: requestedStart } }, // any overlap
                { start: { $lte: requestedStart }, end: { $gte: requestedEnd } } // exactly covers or contains
            ]
        });


        if (conflict) {
            return res.status(400).json({ message: "Time slot already booked" });
        }

        // Create reservation
        const newReservation = await Reservation.create({
            start: requestedStart,
            end: requestedEnd,
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
        res.status(500).json({ message: "Server error, failed to delete reservation" });
    }
};

// GET /api/reservations/freeslots/:reserved_id/:start/:end
const getFreeSlots = async (req, res) => {
    const { reserved_id, start, end } = req.params;

    const startTime = new Date(start);
    const endTime = new Date(end);

    if (startTime >= endTime) {
        return res.status(400).json({ message: "Start time must be before end time" });
    }

    try {
        const reservations = await Reservation.find({
            reserved_id : reserved_id,
            start: { $lt: endTime },
            end: { $gt: startTime }
        }).sort('start');

        let freeSlots = [];
        let currentTime = startTime;

        for (let r of reservations) {

            if (new Date(r.start) > currentTime) {
                freeSlots.push({ begins: currentTime, ends: new Date(r.start) })
            }
            if (new Date(r.end) > currentTime) {
                currentTime = new Date(r.end);
            }
        }

        if (currentTime < endTime) {
            freeSlots.push({ begins: currentTime, ends: endTime })
        }

        res.status(200).json(freeSlots);
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error}, failed to retrieve free slots` });
    }
};

module.exports = {
    getAllReservations,
    createReservation,
    getReservationById,
    updateReservation,
    deleteReservation,
    getFreeSlots
};
