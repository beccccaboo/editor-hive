import express from "express"
import cors from "cors"
import mongoose from "mongoose";

import routes from "./../routes/index.js"
import dotenv from "dotenv"

const app = express()
app.use(express.json()) //Helps to parse JSON body
app.use(express.urlencoded({ extended: true }))
app.use(cors())

dotenv.config()
//app.use(DocumentRoutes)

routes(app)
const connection_string = process.env.CONNECTION_STRING

//MongoDB Connection
mongoose.connect(connection_string)
    .then(() => console.log("Connection established"))
    .catch((error) => console.log("Connection Failed",error.message))

export default app;