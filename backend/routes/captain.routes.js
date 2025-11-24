import express from "express";
import {body} from "express-validator"
import { getCaptainProfile, loginCaptain, logOutCaptain, registerCaptain } from "../controllers/captain.controller.js";
import { authCaptain } from "../middlewares/auth.middleware.js";


 const captainRoutes = express.Router() 


captainRoutes.post("/register",[
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullname.firstname').isLength({min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 3}).withMessage('Password must be at least 3 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Vehicle plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be either car, motorcycle, or auto')
] ,registerCaptain)

captainRoutes.post("/login",[
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({min:3}).withMessage("Password must be at least 3 characters long"),
] ,loginCaptain)

captainRoutes.get("/logout",authCaptain, logOutCaptain)

captainRoutes.get("/profile", authCaptain, getCaptainProfile)


export default captainRoutes;