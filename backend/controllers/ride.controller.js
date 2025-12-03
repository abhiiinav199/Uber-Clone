import { validationResult } from "express-validator";
import { calculateFare, createRide } from "../services/ride.service.js";

export const startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()});
  }


  const { pickup, destination, vehicleType } = req.body;
  try {
    const ride = await createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    return res.status(200).json({ message: "Ride created successfully", ride });
  } catch (error) {
    return res.status(500).json({ message: error || error.message });
  }
};


export const getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()});
  }

  const { pickup, destination } = req.query;
  try {
    const fare = await calculateFare(pickup, destination);
    return res.status(200).json({ fare });
  } catch (error) {
    return res.status(500).json({ message: error || error.message });
  }
};