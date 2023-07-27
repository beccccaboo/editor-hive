import {setError, setResponse} from "./index.js";
import { sendEmail } from "../utils/sendEmail.js";

//Search for all todos (get request)
export const send = async (req, res) => {
    try{
        const message = req.body.message
        await sendEmail(req.body.email, `You have a message from ${req.body.user}!`, message)
        setResponse("Success", res)
    } catch (error) {
        setError(error, 400, res)
    }
}