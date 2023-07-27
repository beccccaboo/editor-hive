import express from "express";
import { addMessage,delMessage, getMessages } from "../controllers/message-controllers.js";
const Router = express.Router()

// Routes to create a new to-do and display all to-dos
Router.route("/")
    .post(addMessage) 
    .delete(delMessage) //Passing the function and not invoking the function

Router.route("/:id")
    .get(getMessages)
export default Router;
