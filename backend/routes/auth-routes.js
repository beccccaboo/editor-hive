import express from "express";
import * as authController from "./../controllers/auth-controller.js"
import {auth} from "../middleware/auth.js";
const Router = express.Router()

console.log("called auth routes")
Router.route("/signup")
    .post(authController.signup)
    
Router.route("/signin")
    .post(authController.signin)

Router.route("/user/:id")
    .patch(authController.updateUser)

Router.route("/pwd/:id")
    .patch(authController.updatePwd)
    

export default Router;

