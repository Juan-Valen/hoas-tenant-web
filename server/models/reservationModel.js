const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reservationSchema = new Schema(
    {
        reserved_id: {
            type: String,
            required: true,
        },
        start: {
            type: Date,
            required: true,
            get: v => v.toISOString()
        },
        end: {
            type: Date,
            required: true,
             get: v => v.toISOString(),
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

