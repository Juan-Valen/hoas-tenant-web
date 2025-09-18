const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const marketSchema = new Schema(
    {
        owner_id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Market", marketSchema);
