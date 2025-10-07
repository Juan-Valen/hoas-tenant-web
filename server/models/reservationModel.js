const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reservationSchema = new Schema(
    {
        reserved_type: {
            type: String,
            enum: ["Item", "Space"],
            required: true,
        },
        reserved_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "reserved_type"
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
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Referencing the User model
        },
    },
    { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation

