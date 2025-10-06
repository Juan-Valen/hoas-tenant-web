const User = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcrypt');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
}

const createCookie = async (_id) => {
    const user = await User.findOne({ _id });
    const token = createToken(user._id);
    const cookie = { id: user._id, status: user.status, email: user.email, token };
    return cookie;
}

// GET api/users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "_id name email status").sort({ createdAt: -1 });
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
        const user = await User.findById(userId, "_id name email status");
        if (user) {
            res.status(200).send(user); // 204 No Content
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to get User" });
    }

};

// POST api/users
const createUser = async (req, res) => {
    const { name, email, password, status } = req.body;

    try {

        // Validation
        if (!name || !email || !password || status === undefined) {
            return res.status(400).json({ message: "All fields must be filled" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Email is not valid" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Password not strong enough. It should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol." });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        const existingEmail = await User.findOne({ email });
        if (existingUser && existingEmail) {
            return res.status(400).json({ message: "User already exists, or email is already in use" });
        }

        // Create user
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        await User.create({ name, email, password: hash, status });
        res.status(201).json();

    } catch (error) {
        console.error(error)
        res
            .status(400)
            .json({
                message: "Failed to create user",
                error: error.message
            });
    }
};

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields must be filled" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "invalid login credentials" })
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "invalid login credentials" })
        }

        const cookie = await createCookie(user._id);
        res.status(200).json(cookie);

    } catch (error) {
        console.error(error.message);
        res
            .status(500)
            .json({ message: "Failed to login user" });
    }
};

// PUT /users/password/
const updatePassword = async (req, res) => {
    const { email, password, updated_password } = req.body

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "invalid login credentials" })
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "invalid login credentials" })
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(updated_password, salt);

        console.log(user);
        const updateUser = await User.findOneAndUpdate(
            { _id: user._id },
            {
                password: hash,
            },
            { new: true }
        );
        if (updateUser) {
            res.status(200).json(updateUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Failed to update Password" });
    }
};

// PUT /users/:userId
const updateUser = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {

        const updateUser = await User.findOneAndUpdate(
            { _id: userId },
            {
                name: req.body.name,
                email: req.body.email,
                status: req.body.status,
            },
            { new: true }
        );
        if (updateUser) {
            res.status(200).json(updateUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to update User" });
    }
};
function generatePassword() {
    var length = 10,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

// PUT /users/password/reset/:userId
const resetPassword = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const password = generatePassword();
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const updateUser = await User.findOneAndUpdate(
            { _id: userId },
            {
                password: hash
            },
            { new: true }
        );
        if (updateUser) {
            res.status(200).json({ password });
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
    updateUser,
    resetPassword,
    updatePassword,
    deleteUser,
    loginUser
};
