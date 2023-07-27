import express from "express";
import * as mailController from "./../controllers/mail-controller.js"
const Router = express.Router()

// Routes to create a new to-do and display all to-dos
Router.route("/")
    .post(mailController.send)  //Passing the function and not invoking the function
    

export default Router;
