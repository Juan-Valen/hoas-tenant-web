const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marketSchema = new Schema(
  {
    owner_id: { type: String, required: true },
    sellerName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    free: { type: Boolean, default: false }, // free/giveaway option
    category: { type: String, required: true },
    images: [{ type: String }], // array of image URLs
  },
  { timestamps: true }
);

module.exports = mongoose.model("Market", marketSchema);

