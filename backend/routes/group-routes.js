import express from "express";
import * as GroupController from "../controllers/group-controller.js"
const Router = express.Router()

Router.route("/")
    .get(GroupController.getAllGroups)
    
export default Router;