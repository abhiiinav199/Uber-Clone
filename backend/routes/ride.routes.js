import express from "express";
import {body, query } from "express-validator"
import { getFare, startRide } from "../controllers/ride.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const rideRoutes = express.Router();

rideRoutes.post("/start-ride", authUser,[
    body("pickup").isString().isLength({min:3}).withMessage("Invalid Pickup Address"),
    body("destination").isString().isLength({min:3}).withMessage("Invalid Destination Address"),
    body("vehicleType").isString().isIn(["auto", "car", "moto"]).withMessage("Invalid vehicle type")
    
] ,startRide);

rideRoutes.get("/get-fare", authUser, [
    query("pickup").isString().isLength({min:3}).withMessage("Invalid Pickup Address"),
    query("destination").isString().isLength({min:3}).withMessage("Invalid Destination Address"),
] ,getFare);

export default rideRoutes;
