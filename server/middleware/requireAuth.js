const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
    console.log("requireAuth middleware invoked");
    try {
        // Extract authorization header
        const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Authorization token required" });
    }

    const token = authorization.split(' ')[1];

        // Verify token is present after splitting
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: "No token provided" 
            });
        }

        // Verify and decode JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Extract user ID from decoded token
        const { _id } = decoded;
        
        if (!_id) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid token payload" 
            });
        }

        // Check if user still exists in database
        const user = await User.findById(_id).select('_id email role');
        
        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: "User no longer exists" 
            });
        }
        
        // Continue to next middleware
        next();

    } catch (error) {
        // Handle specific JWT errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false,
                message: "Invalid token" 
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false,
                message: "Token has expired" 
            });
        }

        // Log error for debugging (but don't expose to client)
        console.error('Authentication error:', error.message);
        
        // Generic error response
        return res.status(500).json({ 
            success: false,
            message: "Authentication failed" 
        });
    }
};

module.exports = requireAuth;