const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const backlistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model")

module.exports.authMiddleware = async (req,res,next)=>{

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({error: "Access denied. No token provided."});
    }
    const isBlacklisted = await backlistTokenModel.findOne({token});

    if(isBlacklisted){
        return res.status(401).json({error: "Access denied. Token is blacklisted."});
    }

    try{
        const decodes = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decodes._id)
        if(!user){
            return res.status(401).json({error: "Invalid token. User not found."});
        }
        req.user = user;
        next();
    }catch(error){
        return res.status(401).json({error: "Invalid token.Error in auth middleware: " + error.message});
    }

}


module.exports.authCaptain = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message:'Unauthorized:authCaptain middleware'})
    }
    const isBlacklisted = await backlistTokenModel.findOne({token:token});

    if(isBlacklisted){
        return res.status(401).json({ message:'Unauthorized:authCaptain middleware'})
    }
    try{    
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const captain = await captainModel.findById(decoded._id)
        if(!captain){
            return res.status(401).json({message:"Access denied"})
        }
        req.captain= captain
        next();
    }catch(error){
        return res.status(401).json({error: "Invalid token.Error in auth|Captain middleware: " + error.message});
    }
}
