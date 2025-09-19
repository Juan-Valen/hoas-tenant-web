const Market = require('../models/marketModel');
const mongoose = require('mongoose');
const { generateText } = require("../services/textGenerator")

// GET api/markets
const getAllMarkets = async (req, res) => {
    try {
        const markets = await Market.find({}).sort({ createdAt: -1 });
        res.status(200).json(markets);
    } catch (error) {
        res.status(500).json({ message: ("failed to retrieve reservations: " + error.message) });
    }
};

// GET api/markets/:marketId
const getMarketById = async (req, res) => {
    const { marketId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(marketId)) {
        return res.status(400).json({ message: "Invalid market ID" });
    }

    try {
        const market = await Market.findById(marketId);
        if (market) {
            res.status(204).send(); // 204 No Content
        } else {
            res.status(404).json({ message: "Market not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to get Market" });
    }

};

// POST api/markets
const createMarket = async (req, res) => {
    const { description } = req.body
    try {
        descCheck = await(generateText(description))

        if (descCheck) {
            const newMarket = await Market.create({ ...req.body });
            res.status(201).json(newMarket);
        }
        else {
            res
                .status(200)
                .json({
                    message: "Inappropriate description"
                });
        }
    } catch (error) {
        res
            .status(400)
            .json({
                message: "Failed to create market",
                error: error.message
            });
    }
};

// PUT /markets/:marketId
const updatedMarket = async (req, res) => {
    const { marketId } = req.params;

    if (!mongoose.Types.marketId.isValid(marketId)) {
        return res.status(400).json({ message: "Invalid market ID" });
    }

    try {
        const updatedMarket = await Market.findOneAndUpdate(
            { _id: marketId },
            { ...req.body },
            { new: true }
        );
        if (updatedMarket) {
            res.status(200).json(updatedMarket);
        } else {
            res.status(404).json({ message: "Market not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to update Market" });
    }
};

// DELETE /markets/:marketId
const deleteMarket = async (req, res) => {
    const { marketId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(marketId)) {
        return res.status(400).json({ message: "Invalid market ID" });
    }

    try {
        const deletedMarket = await Market.findOneAndDelete({ _id: marketId });
        if (deletedMarket) {
            res.status(204).send(); // 204 No Content
        } else {
            res.status(404).json({ message: "Market not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete Market" });
    }
};

module.exports = {
    getAllMarkets,
    getMarketById,
    createMarket,
    updatedMarket,
    deleteMarket
};