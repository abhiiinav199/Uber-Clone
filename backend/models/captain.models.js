import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

const captainSchema= new mongoose.Schema({
    fullname:{
        firstname: {
            type: String,
            required:  [true, "First name is required"],
            minlength: [3 , "First name must be at least 3 characters"],
            trim: true
        },
        lastname:{
            type: String,
            minlength: [3 , "Last name must be at least 3 characters"],
            trim: true
        }
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        minlength: [5, "Email must be at least 5 characters"],
        lowercase: true,
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    socketId:{
        type: String
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color:{
            type: String,
            required: [true, "Vehicle color is required"],
            minlength:[3, "Color must be at least 3 characters Long"]
        },
        plate: {
            type: String,
            required: [true, "Vehicle plate is required"],
            minlength:[3, "Plate must be at least 3 characters Long"]
        },
        capacity:{
            type: Number,
            required: [true, "Vehicle capacity is required"],
            min:[1, "Capacity must be at least 1"]
        },
        vehicleType:{
            type: String,
            required: [true, "Vehicle type is required"],
            enum: ['car', 'motorcycle', 'auto'],
        }
    },
    location :{
        lat: Number,
    },
    lng: {
        type: Number,
    }
})

//method to generate auth token which runs on document level
captainSchema.methods.generateAuthToken = async function() {
    const token = await jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
    return token
}

//compare password using methods which runs on document level
captainSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password)
}


//hashing password using statics method which runs on model level
captainSchema.statics.hashPassword =async function (password){
        return await bcrypt.hash(password, 10)
}

export const captainModel = mongoose.model("Captain", captainSchema)