const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const marketSchema = new Schema(
    {
        owner_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
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

const Market = mongoose.model("Market", marketSchema);

module.exports = Market;
