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