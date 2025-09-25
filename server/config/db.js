const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || "mongodb://localhost:27017/web-dev";
        if (uri === "mongodb://localhost:27017/web-dev") {
            console.warn("Warning: Using default MongoDB URI. Set MONGO_URI in environment variables for production.");
        }
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;

