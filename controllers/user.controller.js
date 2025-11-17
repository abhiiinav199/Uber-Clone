import userModel from "../models/user.models.js";
import { validationResult } from "express-validator";
import {createUser}  from "../services/user.service.js";


export const registerUser = async (req, res) => {
  
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    console.log(req.body)

    const {fullname ,email, password} = req.body

    const hashedPassword = await userModel.hashPassword(password)

     const user= await createUser({
        firstname:fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
     })

     const token = await  user.generateAuthToken(user)

     res.status(201).json({user, token})
}