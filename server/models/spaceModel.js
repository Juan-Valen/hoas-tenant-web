const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const spaceSchema = new Schema(
    {
        room_number: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        maintenance: {
            type: Number,
            required: true,
        },
        description: {
            type: Number,
            required: true,
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
