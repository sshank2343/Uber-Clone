const bcrypt = require('bcrypt')
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service')
const {validationResult} = require('express-validator')
const blacklistTokenModel = require('../models/blacklistToken.model')

const registerCaptainController = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {fullname,email,password,vehicle} = req.body;

    const isCaptainExist = await captainModel.findOne({email});
    if(isCaptainExist){
        return res.status(400).json({error:"Captain already exists with this email"});
    }

    const hashPassword = await captainModel.hashPassword(password);


    const captain = await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });
    const token = captain.generateAuthToken();
    res.cookie("token",token)
    res.status(201).json({captain,token});
}



const loginCaptainController = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email,password} = req.body;

    const captain = await captainModel.findOne({email}).select("+password");
    // console.log("Captain found: ", captain);
    if(!captain){
        return res.status(400).json({error:"Invalid captain"});
    }

    const isPasswordMatch = await captain.comparePassword(password);
    console.log("Password match: ", isPasswordMatch);
    if(!isPasswordMatch){
        return res.status(400).json({error:"Invalid password"});
    }

    const token = captain.generateAuthToken();
    res.cookie("token",token)
    res.json({captain,token});
}



const getCaptainProfile = async(req,res)=>{
    const captain = req.captain;
    res.json({captain});
}


const logoutCaptainController = async(req,res)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistTokenModel.create({token});

    res.clearCookie("token");
    res.status(200).json({message:"Captain logged out successfully"});

}

module.exports = {
    registerCaptainController,
    loginCaptainController,
    getCaptainProfile,
    logoutCaptainController
}