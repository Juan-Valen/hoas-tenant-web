const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    free: { type: Boolean, default: false },
    sellerName: { type: String, required: true },
    category: { type: String },
    images: [String],
    status: { type: String, enum: ["Pending","Approved","Rejected"], default: "Approved" }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
