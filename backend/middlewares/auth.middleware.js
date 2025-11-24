import userModel from "../models/user.models.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { BlacklistTokenModel } from "../models/blacklistToken.models.js";
import { captainModel } from "../models/captain.models.js";

dotenv.config()

export const authUser = async (req, res, next) => {
    //getting token from cookies or headers 
    const token = req?.cookies?.token || req?.headers?.authorization?.split(" ")[1] // req.headers.authorization usually comes as "Bearer: tokenvalue" so we need to split and get token value only by using split(" ")[1]

    if (!token) {
        return res.status(401).json({ error: true, success: false, message: "Access denied. No token provided, Unauthorized" })
    }

    //check if token is blacklisted connected with logout functionality and balcklistToken model
    const isBlacklistedToken = await BlacklistTokenModel.findOne({ token })
    if (isBlacklistedToken) {
        return res.status(401).json({ error: true, success: false, message: "Token is blacklisted. Please login again." })
    }

    try {
        //verfying token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        //getting user from token by searching decode_id(that is: user_id set from user.models.js using methods(call in document level)) in database
        const user = await userModel.findById(decoded._id)

        //attaching user to req object
         req.user = user

         return next()


    } catch (error) {
        return res.status(401).json({ error: true || error.error, success: false, message: "Invalid token" })
    }
}


export const authCaptain = async (req, res, next) =>{


        const token = req.cookies.token || req.headers.authorization.split(" ")[1]

        if(!token){
            return res.status(401).json({error: true, success: false, message: "Access denied. No token provided, Unauthorized"})
        }

        const isBlacklistedToken = await BlacklistTokenModel.findOne({token})
        if(isBlacklistedToken){
            return res.status(401).json({error: true, success:false, message: "Token is blacklisted. Please login again."})
        }

            try{
                const decoded= await jwt.verify(token, process.env.JWT_SECRET)
                const captain = await captainModel.findById(decoded._id)
                req.captain = captain
                return next()
    } catch(error){
        return res.status(401).json({error: true, success: false, message: "invalid Token"})
    }
}