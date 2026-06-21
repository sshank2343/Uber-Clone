const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const {validationResult} = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");
const registerUserController = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    console.log("Request body:", req.body); 
    const hashedPassword = await userModel.hashPassword(req.body.password);
    req.body.password = hashedPassword;
    try {

        const {fullname,email,password} = req.body;
        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password
        });
        const token = user.generateAuthToken();
        res.cookie("token", token);
        res.status(201).json({user, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const loginUserController = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email}).select("+password");
        if(!user){
            return res.status(401).json({error: "Invalid email or password"});
        }
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch){
            return res.status(401).json({error: "Invalid email or password"});
        }
        const token = user.generateAuthToken();
        res.cookie("token", token);
        
        res.status(200).json({user, token});
    } catch(error){
        res.status(400).json({error: "Error in login controller: " + error.message});
    }
}


const getUserProfileController = async (req,res)=>{
    try{
        const userId = req.user._id;
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        res.status(200).json({user});
    }catch(error){
        res.status(400).json({error: "Error in get user profile controller: " + error.message});
    }
}

const logoutUserController = async (req,res)=>{
    try{
        res.clearCookie("token");
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        await blacklistTokenModel.create({token});
        
        res.status(200).json({message: "Logged out successfully"});
    }catch(error){
        res.status(400).json({error: "Error in logout controller: " + error.message});
    }
}

module.exports = {
    registerUserController,
    loginUserController,
    getUserProfileController,
    logoutUserController
}