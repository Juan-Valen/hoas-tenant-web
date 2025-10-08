const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema(
    {
        identifier: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['washing machine', 'dryer', 'utility', 'other'],
            required: true,
        },
        reservable: {
            type: Boolean,
            required: false,
        },
        location: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        maintenance: {
            type: Number,
            enum: [0/*Everything okay*/, 1/*Under maintenance*/, 2/*Damaged*/],
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
