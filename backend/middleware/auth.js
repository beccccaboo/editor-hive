import jwt from "jsonwebtoken";
import {setError} from "../controllers/index.js";

export const auth = (req, res, next) =>{
    const token = req.header("x-auth-token")
    if(!token) setError("Not authorized", 401, res)

    try{
        const secretKey = process.env.SECRET_KEY
        const payload = jwt.verify(token, secretKey)
        req.user = payload
        next()
    } catch (err) {
        setError("Invalid Token", 400, res)
    }
}