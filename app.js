import express from "express"
import morgan from "morgan"
import cors from "cors"
import { connectDB } from "./config/db.js"
import userRoutes from "./routes/user.routes.js"

connectDB()

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({ extended: true })) // Not needed unless set up ejs or similar for form submissions from client side

app.use("/users", userRoutes)
export default app