import express from "express"
import {body } from "express-validator"
import { registerUser } from "../controllers/user.controller.js"
 
const userRoutes = express.Router() 

userRoutes.post("/register", [
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullname.firstname').isLength({min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 3}).withMessage('Password must be at least 3 characters long')
] , registerUser)

export default userRoutes 