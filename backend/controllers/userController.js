import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && await user.matchPassword(password)) {
        
        generateToken(res , user._id);

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
    const {email , name , password} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error('User already Exist')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        generateToken(res, user._id)
        res.status(201).json({
            _id : user.id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
        })
    }
    else{
        res.status(400);
        throw new Error('user data incorrect ')
    }
})

const logoutUser = asyncHandler(async(req,res) => {
   res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0)
   })
   res.status(200).json({message : 'Logout user Successfully'})
})

const getUserProfile = asyncHandler(async(req,res) => {
    // res.send('get user profile');
    const user = await User.findById(req.user._id)
    if(user){
        
        res.status(201).json({
            _id : user.id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
        })}
        else{
            res.status(400);
            throw new Error('user data incorrect ')
        }
});

const updateUserProfile = asyncHandler(async(req,res) => {
    // res.send('Update user profile');
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name;
        user.email =req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }
        const updateUser = await user.save();
            res.status(201).json({
                _id : updateUser.id,
                name : updateUser.name,
                email : updateUser.email,
                isAdmin : updateUser.isAdmin,
            })}
            else{
                res.status(400);
                throw new Error('user not found ')
            } 
        })

const updateUser= asyncHandler(async(req,res) => {
    res.send({message :'Update user'});
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