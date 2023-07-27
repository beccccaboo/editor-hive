import User from "../models/User.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config()

export const signup = async (user) => {  //Make it async because it will return a promise


    const newUser = new User(user)
    //Hash the password
    const salt = await bcrypt.genSalt()
    newUser.password = await bcrypt.hash(newUser.password, salt)
    console.log("In signUp service: " + newUser)

    return newUser.save() //By default returns a promise
}

export const signin = async (existingUser,user) => {  //Make it async because it will return a promise
    // const newUser = new User(user)
    const validPassword = await bcrypt.compare(user.password, existingUser.password);
    if (!validPassword)
        return false

    console.log("Password matches and logged in");
    return true;
}

export const updateUser = async(id, user) => {
    // const salt = await bcrypt.genSalt()
    // user.password = await bcrypt.hash(user.password, salt)

    return await User.findByIdAndUpdate(id, user, {new: true}).exec()
}

export const updatePwd = async(id, pwd) => {
    const salt = await bcrypt.genSalt()
    pwd.password = await bcrypt.hash(pwd.password, salt)

    return await User.findByIdAndUpdate(id, pwd, {new: true}).exec()
}

