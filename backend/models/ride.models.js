import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: [true, "User id is required"]
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Captain"
    },
    pickup:{
        type: String,
        required: [true, "Pickup is required"]
    },
    destination:{
        type: String,
        required: [true, "Destination is required"]
    },
    fare:{
        type: Number,
        required: [true, "Fare is required"]
    },
    status:{
        type: String,
        enum: ["pending", "accepted","ongoing", "completed", "cancelled"],
        default: "pending"
    },
    duration:{
        type: Number //in seconds
    },
    distance:{
        type: Number //in meters
    },
    paymentID:{
        type: String, 
    },
    orderId:{
        type: String, 
    },
    signature:{
        type: String,
    },
    otp:{
        type: String,
        select: false,
        required: [true, "Otp is required"]
    }
})

export const rideModel = mongoose.model("Ride", rideSchema);

