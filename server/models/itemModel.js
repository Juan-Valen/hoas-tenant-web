const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true
        },
        identifier: {
            type: String,
            required: true,
        },
        status: {
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

const Item = mongoose.model("Item", itemSchema);

module.exports = Item