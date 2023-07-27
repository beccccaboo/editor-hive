import * as authService from "./../services/auth-service.js";
import {setError, setResponse} from "./index.js";
import dotenv from "dotenv";
import Joi from "joi";
import User from "../models/User.js";
import {sendEmail} from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
dotenv.config()

export const signup = async (req, res) => {
    console.log("signup method called")
    try{
        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
        const {error} = schema.validate({...req.body, phoneNumber:req.body.phoneNumber.toString()})
        if(error) return setError(error.details[0].message, 400, res)

        //Check if User with the same email already exists
        const existingUser = await User.findOne({email: req.body.email})
        if(existingUser) return setError("User already exists", 400, res)

        const user = req.body
        const savedUser = await authService.signup(user)

        await sendEmail(req.body.email, "Welcome to Editor Hive!", process.env.EMAIL_BODY)
        const token = createToken(savedUser)
        // setResponse(savedUser, res)
        console.log("Token in Signup Controller: "+token)
        setToken(savedUser, token, res);
    } catch (error) {
        setError(error, 500, res)
    }
}


export const signin = async (req, res) => {
    try{
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
        const {error} = schema.validate(req.body)
        if(error) return setError(error.details[0].message, 400, res)

        let existingUser = await User.findOne({ email: req.body.email });
        console.log("user email", existingUser)
        if (!existingUser)
            return setError("User with the given Email doesn't exist", 400, res)

        const user = req.body
        console.log("test",user)
        const loggedInUser = await authService.signin(existingUser,user)

        if(loggedInUser) {
            const token = createToken(existingUser)
            console.log("saved user after logging in. Token is: ", token)
            setToken(existingUser, token, res);
        } else {
            return setError("Invalid email or password", 400, res)
        }
      }
      catch (err) {
        setError(err, 500, res)
      }
    }


export const createToken = (user) =>{
    //Creating token for the user
    const secretKey = process.env.SECRET_KEY
    const token = jwt.sign({_id: user._id, firstName: user.firstName, email: user.email, lastName: user.lastName, phoneNumber: user.phoneNumber, password: user.password}, secretKey)
    return token
}
export const setToken = (user, token, response) => {
    console.log("Set Token: "+ token)
    response.json(token)
}

export const updateUser = async (req, res) =>{
    try{
        const id = req.params.id
        const user = req.body
        const updatedUser = await authService.updateUser(id, user)
        const token = createToken(updatedUser)
        // setResponse(updatedUser, res)
        setToken(updatedUser, token, res);
    } catch(error) {
        setError(error, 500, res)
    }

}

export const updatePwd = async (req, res) =>{
    try{
        const id = req.params.id
        const pwd = req.body
        const updatedUser = await authService.updatePwd(id, pwd)
        const token = createToken(updatedUser)
        // setResponse(updatedUser, res)
        setToken(updatedUser, token, res);
    } catch(error) {
        setError(error, 500, res)
    }

}