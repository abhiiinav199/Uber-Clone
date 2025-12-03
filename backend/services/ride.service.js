import crypto from "crypto";
import { rideModel } from "../models/ride.models.js";
import { getDistanceAndTime } from "./maps.service.js";

export const calculateFare = async (pickup, destination) => {
  try {
    if (!pickup || !destination) {
      throw new Error("Pickup and destination are required");
    }
    const distanceTime = await getDistanceAndTime(pickup, destination);
    const baseFare = {
      auto: 30, // Base fare for auto in INR
      car: 50, // Base fare for car in INR
      moto: 20, // Base fare for moto in INR
    };
    const ratePerKm = {
      auto: 10, // Rate per km for auto in INR
      car: 15, // Rate per km for car in INR
      moto: 8, // Rate per km for moto in INR
    };

    const perMinuteRate = {
      auto: 2, // Rate per minute for auto in INR
      car: 3, // Rate per minute for car in INR
      moto: 1.5, // Rate per minute for moto in INR
    };
    const distanceInKm = distanceTime.distance.value/ 1000  //  getting distance in km and converting it to meters
    const timeInMinutes = distanceTime.duration.value/60; // Assuming time is in seconds
   
 

    const autoFare =
      baseFare.auto +
     distanceInKm * ratePerKm.auto +
     timeInMinutes * ratePerKm.auto

    const carFare =
      baseFare.car +
      distanceInKm* ratePerKm.car+ 
      timeInMinutes * ratePerKm.car

    const motoFare =
      baseFare.moto +
      distanceInKm * ratePerKm.moto +
      timeInMinutes * ratePerKm.moto;

    const fare = {
      auto: Math.round(autoFare),
      car: Math.round(carFare),
      moto: Math.round(motoFare),
      // distance: distanceTime.distance,
      // time: distanceTime.duration,
    };

    return fare;
  } catch (error) {
    return res.status(500).json({ message: error || error.message });
  }

};

export const getOtp = async (num) => {
  // Generate secure random digits
  const otp = crypto.randomInt(
    Math.pow(10, num - 1),
    Math.pow(10, num)
  ).toString();


  return otp;
};




export const createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  try {
    if (!user || !pickup || !destination || !vehicleType) {
      throw new Error(
        "User, pickup, destination and vehicle type are required"
      );
    }
    const fare = await calculateFare(pickup, destination);
    const ride = await rideModel.create({
      user,
      pickup,
      destination,
      otp: await getOtp(6),
      fare: fare[vehicleType],
    });

    return ride;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
