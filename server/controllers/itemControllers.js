const Item = require('../models/itemModel');
const mongoose = require('mongoose');

// GET api/items
const getAllItems = async (req, res) => {
    try {
        const items = await Item.find({}).sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: ("failed to retrieve reservations: " + error.message) });
    }
};

// GET api/items/:itemId
const getItemById = async (req, res) => {
    const { itemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        return res.status(400).json({ message: "Invalid item ID" });
    }

    try {
        const deletedItem = await Item.findById(itemId);
        if (deletedItem) {
            res.status(204).send(); // 204 No Content
        } else {
            res.status(404).json({ message: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to get Item" });
    }

};

// POST api/items
const createItem = async (req, res) => {
    try {
        const newItem = await Item.create({ ...req.body });
        res.status(201).json(newItem);
    } catch (error) {
        res
            .status(400)
            .json({
                message: "Failed to create item",
                error: error.message
            });
    }
};

// PUT /items/:itemId
const updatedItem = async (req, res) => {
    const { itemId } = req.params;

    if (!mongoose.Types.itemId.isValid(itemId)) {
        return res.status(400).json({ message: "Invalid item ID" });
    }

    try {
        const updatedItem = await Item.findOneAndUpdate(
            { _id: itemId },
            { ...req.body },
            { new: true }
        );
        if (updatedItem) {
            res.status(200).json(updatedItem);
        } else {
            res.status(404).json({ message: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to update Item" });
    }
};

// DELETE /items/:itemId
const deleteItem = async (req, res) => {
    const { itemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        return res.status(400).json({ message: "Invalid item ID" });
    }

    try {
        const deletedItem = await Item.findOneAndDelete({ _id: itemId });
        if (deletedItem) {
            res.status(204).send(); // 204 No Content
        } else {
            res.status(404).json({ message: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete Item" });
    }
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updatedItem,
    deleteItem
};
