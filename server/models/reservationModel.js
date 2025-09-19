const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reservationSchema = new Schema(
    {
        reserved_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        start: {
            type: String,
            required: true
        },
        end: {
            type: String,
            required: true,
        },
        reserved_by: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Referencing the User model
        },
    },
    { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation

