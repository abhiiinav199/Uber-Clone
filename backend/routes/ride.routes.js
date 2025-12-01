import express from "express";
import {body } from "express-validator"
import { startRide } from "../controllers/ride.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const rideRoutes = express.Router();

rideRoutes.post("/start", authUser,[
    body("pickup").isString().isLength({min:3}).withMessage("Invalid Pickup Address"),
    body("destination").isString().isLength({min:3}).withMessage("Invalid Destination Address"),
    body("vehicleType").isString().isIn(["auto", "car", "moto"]).withMessage("Invalid vehicle type")
    
] ,startRide);

export default rideRoutes;
