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
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
