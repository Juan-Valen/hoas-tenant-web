const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const marketImageSchema = new Schema(
    {
        market_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Market'
        },
        img: {
            data: Buffer,
            contentType: String
        },
        filename: {
            type: String,
            required: true
        },
        originalName: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("MarketImage", marketImageSchema);