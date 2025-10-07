const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const spaceSchema = new Schema(
    {
        identifier/*room_number*/: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['clubroom', 'sauna', 'utility', 'other'],
            required: true,
        },
        maintenance: {
            type: Number,
            enum: [0/*Everything okay*/, 1/*Under maintenance*/, 2/*Damaged*/],
            required: true,
        },
        reservable: {
            type: Boolean,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Referencing the User model
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Space", spaceSchema);
