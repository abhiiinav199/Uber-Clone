import http from "http"
import app from "./app.js"
import dotenv from "dotenv"
dotenv.config()


const server = http.createServer(app) // create server using the app

server.listen(process.env.PORT, () =>{
    console.log(`Sever is running on https://localhost:${process.env.PORT}`)
})

