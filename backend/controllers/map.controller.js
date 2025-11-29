import { getAddressCoordinate, getDistanceAndTime, getSuggestionsFunc } from "../services/maps.service.js"
import { validationResult } from "express-validator"


export const getCoordinates = async (req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error: true, success: false, errors: errors.array()})
    }
    const {address} = req.query
    try {
        const coordinates = await getAddressCoordinate(address)
        return res.status(200).json({error: false, success: true, coordinates})
    } catch (error) {
        return res.status(404).json({error: true, success: false, message: "Coordinates not found"})
    }  
} 

export const getDistanceTime = async (req, res) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error: true, success: false, errors: errors.array()})
    }
    const {origin, destination} = req.query
    try {
        const distanceTime = await getDistanceAndTime(origin, destination)
        return res.status(200).json({error: false, success: true, distanceTime})
    } catch (error) {
        return res.status(404).json({error: true, success: false, message: "Distance and time not found"})
    }
}


export const getSuggestions = async (req, res) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error: true, success: false, errors: errors.array()})
    }
 
    try {
        const {input} = req.query
        const suggestions = await getSuggestionsFunc(input)
        return res.status(200).json({error: false, success: true, suggestions})
    } catch (error) {
        return res.status(404).json({error: true, success: false, message: "Suggestions not found"})
    }
}