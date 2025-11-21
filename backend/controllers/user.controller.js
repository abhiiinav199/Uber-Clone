import userModel from "../models/user.models.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";
import { BlacklistTokenModel } from "../models/blacklistToken.models.js";


export const registerUser = async (req, res) => {
    try {

        //validationResult coming from user.routes.js
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        //destructuring fullname, email and password from req.body
        const { fullname, email, password } = req.body


        const isUserAlreadyRegistered = await userModel.findOne({email})
        if(isUserAlreadyRegistered){
            return res.status(400).json({error: true, success: false, message: "User with this email already exists"})
        }


        //hashing password using userModel statics method which runs on model level
        const hashedPassword = await userModel.hashPassword(password)

        //creating user using createUser from "/services/user.service.js"
        const user = await createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        })

        //generate auth token
        const token = await user.generateAuthToken(user)

        //removing password from user object before sending response
        const userObj = user.toObject()
        delete userObj.password


        res.status(201).json({ user: userObj, token })
    } catch (error) {
        res.status(400).json({ error: true, success: false, message: error.message || error })
    }


}


export const loginUser = async (req, res) => {

    try {

        
    //validationResult coming from user.routes.js
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //destructuring email and password from req.body
    const { email, password } = req.body


        //finding user by email and selecting password field explicitly using .select("+password") because in userModel password field is set to select: false
        const user = await userModel.findOne({ email }).select("+password")
        if (!user) {
            return res.status(401).json({ error: true, success: false, message: "Invalid email or password" })
        }

        //comparing password using userModel methods which runs on document level
        const isMatchPassword = await user.comparePassword(password)
        if (!isMatchPassword) {
            return res.status(401).json({ error: true, success: false, message: "Invalid email or password" })
        }

        //generate auth token
        const token = await user.generateAuthToken()

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }
        res.cookie('token', token, cookieOptions)

        //removing password from the Object{} user password before sending response
        const userObj = user.toObject()
        delete userObj.password

        res.status(200).json({ user: userObj, token })

    } catch (error) {
        res.status(400).json({ error: true, success: false, message: error.message || error })
    }

}


export const getUserProfile = async (req, res) => {

    try {
        if (!req.user) {
            return res.status(404).json({ error: true, success: false, message: "User not found" })
        }
        res.status(200).json({ user: req.user })

    } catch (error) {
        res.status(400).json({ error: true, success: false, message: error.message || error })
    }
}

export const logoutUser = async (req, res) => {


    try {

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }

        //clearing cookie
        res.clearCookie('token', cookieOptions)

        //get token from cookies or headers
        const token = req?.cookies?.token || req?.headers?.authorization.split(" ")[1]

        //blacklisting token by saving it to BlacklistTokenModel
        await BlacklistTokenModel.create({ token })

        res.status(200).json({ message: "User logged out successfully" })

    } catch (error) {
        res.status(400).json({ error: true, success: false, message: error.message || error })
    }

}  