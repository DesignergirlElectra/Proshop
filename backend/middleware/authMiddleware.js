import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js'; // Adjust the import path if needed

// Protect middleware
const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log('Decoded JWT:', decoded); this can be used to verify the token is valid or not

            req.user = await User.findById(decoded.userId).select('-password');
            if (!req.user) {
                throw new Error('User not found');
            }
            next(); // Proceed to the next middleware if the token is valid
        } catch (error) {
            console.error('Error in protect middleware:', error.message);

            if (!res.headersSent) {
                res.status(401).json({ message: 'Not Authorized, token failed' });
            } else {
                console.error('Headers already sent in protect middleware');
            }
        }
    } else {
        if (!res.headersSent) {
            res.status(401).json({ message: 'Not Authorized, no token' });
        } else {
            console.error('Headers already sent in protect middleware');
        }
    }
});

// Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // User is admin, proceed
    } else {
        if (!res.headersSent) {
            res.status(401).json({ message: 'Not Authorized as valid admin' });
        } else {
            console.error('Headers already sent in admin middleware');
        }
    }
};

export { protect, admin };
