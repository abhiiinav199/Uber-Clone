import { BlacklistTokenModel } from "../models/blacklistToken.models.js";
import { captainModel } from "../models/captain.models.js";
import { createCaptain } from "../services/captain.service.js";
import {validationResult} from "express-validator"


export const registerCaptain = async (req, res) => {

    //validationResult coming from captian.routes.js
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        
        //destructuring fullname, email, password and vehicle from req.body
        const {fullname, email, password, vehicle} = req.body

        const isCaptainAlreadyRegistered = await captainModel.findOne({email})
        if(isCaptainAlreadyRegistered){
            return res.status(400).json({error: true, success: false, message: "Captain with this email already exists"})
        }

        //hashing password using captainModel statics method which runs on model level
        const hashedPassword = await captainModel.hashPassword(password)

        //creating captain using createCaptain from "/services/captain.service.js"
        const captain = await createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        })

        //generate auth token
        const token = await captain.generateAuthToken(captain)

        //removing password from captain object before sending response
        const captainObj = captain.toObject()
        delete captainObj.password

        res.status(201).json({captain: captainObj, token})
    } catch (error) {
        res.status(400).json({error: true, success: false, message: error.message || error}) 
    }
}

export const loginCaptain = async (req, res) =>{
    try {
        const errors= validationResult(req)
        if(!errors.isEmpty()){
            return res.json({errors: errors.array()})
        }

        const {email, password}= req.body
        
        const captain= await captainModel.findOne({email}).select("+password")

        if(!captain){
            return res.json({error: true, success: false, message: "Invalid email or password"})
        }

        const isMatch = await captain.comparePassword(password)

        if(!isMatch){
            return res.status(401).json({error: true, success:false, message: "Invalid email or password"})
            
        }

        const token = await captain.generateAuthToken()


          const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }
        res.cookie("token", token, cookieOptions)


        const captainObj = captain.toObject()
        delete captainObj.password

        res.status(200).json({token, captain: captainObj})
        
    } catch (error) {
        res.status(400).json({error: true, success: false, message: error.message || error})
    }
}

export const logOutCaptain = async(req, res) =>{
    try {

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }

        //clearing cookie
        res.clearCookie("token", cookieOptions)

        //get token from cookies or headers
        const token = req?.cookies?.token || req?.headers?.authorization.split(" ")[1]

        //blacklisting token by saving it to BlacklistTokenModel
        await BlacklistTokenModel.create({token})

        res.status(200).json({message: "Captain logged out successfully"})
        
    } catch (error) {
        return res.status(400).json({error: true, success: false, message: error.message || error})
    }
}


export const getCaptainProfile = async(req, res) =>{
    try {
        if(!req.captain){
            return res.status(404).json({error: true, success: false, message: "Captain not found"})
        }
        res.status(200).json({captain: req.captain})
        
    } catch (error) {
    return res.status(400).json({error: true, success: false, message: error.message || error})
    }
}