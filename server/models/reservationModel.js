const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reservationSchema = new Schema(
    {
        reserved_id: {
            type: String,
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
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation

