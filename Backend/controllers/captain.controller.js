const bcrypt = require('bcrypt')
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service')
const {validationResult} = require('express-validator')

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
    req.body.password = hashPassword

    const captain = await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });
    const token = captain.generateAuthToken();
    res.status(201).json({captain,token});
}




module.exports = {
    registerCaptainController
}