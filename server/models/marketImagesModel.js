const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const marketImageSchema = new Schema(
    {
        market_id: {
            type: String,
            required: true,
        },
        img: {
            data: Buffer,
            contentType: String
        }
        ,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Market", marketImageSchema);