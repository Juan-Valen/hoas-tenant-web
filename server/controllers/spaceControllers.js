const Space = require('../models/spaceModel');
const mongoose = require('mongoose');

// GET api/spaces
const getAllSpaces = async (req, res) => {
    try {
        const spaces = await Space.find({}).sort({ createdAt: -1 });
        res.status(200).json(spaces);
    } catch (error) {
        res.status(500).json({ message: ("failed to retrieve reservations: " + error.message) });
    }
};

// GET api/spaces/:spaceId
const getSpaceById = async (req, res) => {
    const { spaceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(spaceId)) {
        return res.status(400).json({ message: "Invalid space ID" });
    }

    try {
        const space = await Space.findById(spaceId);
        if (space) {
            res.status(200).json(space); // Return the space data with 200 OK
        } else {
            res.status(404).json({ message: "Space not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to get Space" });
    }

};

// POST api/spaces
const createSpace = async (req, res) => {
    try {
        const newSpace = await Space.create({ ...req.body });
        res.status(201).json(newSpace);
    } catch (error) {
        res
            .status(400)
            .json({
                message: "Failed to create space",
                error: error.message
            });
    }
};

// PUT /spaces/:spaceId
const updatedSpace = async (req, res) => {
    const { spaceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(spaceId)) {
        return res.status(400).json({ message: "Invalid space ID" });
    }

    try {
        const updatedSpace = await Space.findOneAndUpdate(
            { _id: spaceId },
            { ...req.body },
            { new: true }
        );
        if (updatedSpace) {
            res.status(200).json(updatedSpace);
        } else {
            res.status(404).json({ message: "Space not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to update Space" });
    }
};

// DELETE /spaces/:spaceId
const deleteSpace = async (req, res) => {
    const { spaceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(spaceId)) {
        return res.status(400).json({ message: "Invalid space ID" });
    }

    try {
        const deletedSpace = await Space.findOneAndDelete({ _id: spaceId });
        if (deletedSpace) {
            res.status(204).send(); // 204 No Content
        } else {
            res.status(404).json({ message: "Space not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete Space" });
    }
};

module.exports = {
    getAllSpaces,
    getSpaceById,
    createSpace,
    updatedSpace,
    deleteSpace
};