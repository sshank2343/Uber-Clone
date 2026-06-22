const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,  
            minLength:[3,"Firstname should be at least 3 characters long"],
        },
        lastname:{
            type:String,
            minlength:[3,"Lastname should be at least 3 characters long"],
        }
    },
        email:{
            type:String,
            required:true,
            unique:true,
            match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please enter a valid email address"]
        },
        password:{
            type:String,
            required:true,
            select:false,
        },
        socketId:{
            type:String,
        },
        status:{
            type:String,
            enum:["active","inactive"],
            default:"inactive"
        },
        vehicle:{
            color:{
                type:String,
                required:true,
                minLength:[3,"Color should be at least 3 characters long"],
            },
            plate:{
                type:String,
                required:true,
                unique:true,
            },
            capacity:{
                type:Number,
                required:true,
                min:[1,"Capacity should be at least 1"],
            },
            vehicleType:{
                type:String,
                required:true,
                enum:["car","bike","auto"],
            }
        },
        location:{
            lat:{
                type:Number
            },
            lng:{
                type:Number
            }
        }
    })



captainSchema.methods.generateAuthToken = function(){
        const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
        return token;
    }

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}
captainSchema.statics.hashPassword = async function(password){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        return hashedPassword;
    }
const captainModel = mongoose.model("captain",captainSchema);

module.exports = captainModel;