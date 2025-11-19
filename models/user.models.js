import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: [true, "First name is required"],
            minlegth: [3, "First name must be at least 3 characters"],
            trim: true
        },
        lastname: {
            type: String,
            minlegth: [3, "Last name must be at least 3 characters"],
            trim: true
        }
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        minlegth: [5, "Email must be at least 5 characters"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    socketId: {
        type: String,
    }
})

//method to generate auth token which runs on document level
userSchema.methods.generateAuthToken = async function () {
    const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
    return token;
}
//compare password using methods which runs on document level
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

//hashing password using statics method which runs on model level
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}
// userSchema.pre('save', async function(next) {
//     if (!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });


const userModel = mongoose.model("User", userSchema)

export default userModel