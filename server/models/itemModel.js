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
            enum: ['washing machine', 'dryer', 'utility', 'other'],
            required: true,
        },
        maintenance: {
            type: Number,
            enum: [0/*Everything okay*/, 1/*Under maintenance*/, 2/*Damaged*/],
            required: true,
        },
        resevable: {
            type: Boolean,
            required: false,
        },
        identifier: {
            type: String,
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
