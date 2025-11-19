import express from "express"
import {body } from "express-validator"
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js"
import { authUser } from "../middlewares/auth.middleware.js"

 
const userRoutes = express.Router() 

userRoutes.post("/register", [
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullname.firstname').isLength({min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 3}).withMessage('Password must be at least 3 characters long')
] , registerUser)


userRoutes.post("/login", [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min: 3}).withMessage('Password must be at least 3 characters long')
], loginUser)


userRoutes.get("/profile", authUser ,getUserProfile)

userRoutes.get("/logout", authUser, logoutUser)

export default userRoutes 