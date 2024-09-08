import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'; // Adjust the import path if needed

// Protect middleware
const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded JWT:', decoded);

            req.user = await User.findById(decoded.user_Id).select('-password');
            next(); // Proceed to the next middleware if the token is valid
        } catch (error) {
            // Log the error to identify where it might be occurring
            console.error('Error in protect middleware:', error.message);

            // Check if headers are already sent
            if (!res.headersSent) {
                res.status(401);
                return next(new Error('Not Authorized, token failed')); // Properly pass the error
            } else {
                console.error('Headers already sent in protect middleware');
            }
        }
    } else {
        // Check if headers are already sent
        if (!res.headersSent) {
            res.status(401);
            return next(new Error('Not Authorized, no token')); // Properly pass the error
        } else {
            console.error('Headers already sent in protect middleware');
        }
    }
});

// Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next(); // User is admin, proceed
    }

    // Check if headers are already sent
    if (!res.headersSent) {
        res.status(401);
        return next(new Error('Not Authorized as valid admin')); // Properly pass the error
    } else {
        console.error('Headers already sent in admin middleware');
    }
};

export { protect, admin };
