import express from "express";
import * as checklistController from "./../controllers/checklist-controller.js"
const Router = express.Router()

// Routes to create a new to-do and display all to-dos
Router.route("/")
    .post(checklistController.post)  //Passing the function and not invoking the function
    .get(checklistController.index)

//routes for specific to-do item
Router.route("/:id")
    .get(checklistController.get)
    .delete(checklistController.remove)
    .put(checklistController.updateStatus)

export default Router;
