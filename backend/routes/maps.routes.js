import express from "express"
import { authUser } from "../middlewares/auth.middleware.js"
import {query} from "express-validator"
import { getCoordinates, getDistanceTime, getSuggestions } from "../controllers/map.controller.js"

const mapsRoutes = express.Router()

mapsRoutes.get("/get-coordinates",authUser,query("address").isString().isLength({min: 3}).withMessage("Address must be at least 3 characters long"),getCoordinates)

mapsRoutes.get("/get-distance-time",authUser,query("origin").isString().isLength({min: 3}).withMessage("Address must be at least 3 characters long"),query("destination").isString().isLength({min: 3}).withMessage("Address must be at least 3 characters long"),getDistanceTime)

mapsRoutes.get("/get-suggestions", authUser, query("input").isString().isLength({min: 3}).withMessage("Address must be at least 3 characters long"), getSuggestions)

export default mapsRoutes
