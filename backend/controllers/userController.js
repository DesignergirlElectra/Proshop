import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js";
import jwt from "jsonwebtoken"


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && await user.matchPassword(password)) {
        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        // Set JWT as an HTTP-only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        // Send user data as JSON response
        return res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        // If authentication fails, set status and throw error
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

const registerUser = asyncHandler(async(req,res) => {
    res.send('register user');
})

const logoutUser = asyncHandler(async(req,res) => {
    res.send('logout user');
})

const getUserProfile = asyncHandler(async(req,res) => {
    res.send('get user profile');
})

const updateUserProfile = asyncHandler(async(req,res) => {
    res.send('Update user profile');
})

const updateUser= asyncHandler(async(req,res) => {
    res.send('Update user ');
})

const getUsers = asyncHandler(async(req,res) => {
    res.send('get users');
})

const getUsersById = asyncHandler(async(req,res) => {
    res.send('get users by Id');
})

const deleteProfile = asyncHandler(async(req,res) => {
    res.send('delete profile');
})


export{
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    getUsers,
    getUsersById,
    deleteProfile,
    updateUserProfile,
    updateUser,
}