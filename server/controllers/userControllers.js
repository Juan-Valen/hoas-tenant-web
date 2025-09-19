const User = require('../models/userModel');
const mongoose = require('mongoose');

// GET api/users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: ("failed to retrieve reservations: " + error.message) });
    }
};

// GET api/users/:userId
const getUserById = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const deletedUser = await User.findById(userId);
        if (deletedUser) {
            res.status(204).send(); // 204 No Content
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to get User" });
    }

};

// POST api/users
const createUser = async (req, res) => {
    try {
        const newUser = await User.create({ ...req.body });
        res.status(201).json(newUser);
    } catch (error) {
        res
            .status(400)
            .json({
                message: "Failed to create user",
                error: error.message
            });
    }
};

// PUT /users/:userId
const updatedUser = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.userId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { ...req.body },
            { new: true }
        );
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to update User" });
    }
};

// DELETE /users/:userId
const deleteUser = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const deletedUser = await User.findOneAndDelete({ _id: userId });
        if (deletedUser) {
            res.status(204).send(); // 204 No Content
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete User" });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updatedUser,
    deleteUser
};