import express from "express"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDB } from "./config/db.js"
import userRoutes from "./routes/user.routes.js"
import captainRoutes from "./routes/captain.routes.js"
import mapsRoutes from "./routes/maps.routes.js"
import rideRoutes from "./routes/ride.routes.js"

connectDB()

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({ extended: true })) // Not needed unless set up ejs or similar for form submissions from client side
app.use(cookieParser())


// i want to learn socket io . i dont have any prior knowledge for it. so explain in simple terms with correct terminologies. give deep explanation for itl




app.use("/users", userRoutes)
app.use('/captains', captainRoutes)
app.use("/map", mapsRoutes)
app.use("/rides", rideRoutes)

export default app