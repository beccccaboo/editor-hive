import {user} from "./../State"
import {AuthActionType} from "../Actions/Auth";
import jwtDecode from "jwt-decode";
import {toast} from "react-toastify";

const authReducer = (state = user, action) => {
    const type = action.type
    const token = action.token
    let newUser
    switch (type) {
        case "USER_LOADED":
        case "SIGN_IN":
        case "SIGN_UP":
            toast("Welcome...", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            const user = jwtDecode(token)
            console.log(user)
            newUser = {
                ...state,
                _id: user._id,
                token: token,
                name: user.firstName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                lastName: user.lastName,
                password: user.password
            }
            console.log("Auth-Reducer" + JSON.stringify(newUser))
            break
        case "SIGN_OUT":
            toast("Goodbye...", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            newUser = {
                _id: null,
                token: null,
                name: null,
                email: null,
                phoneNumber: null,
                lastName: null,
                password: null
            }
            break
        case "UPDATE_USER":
        case "UPDATE_PWD":
            const updatedUser = jwtDecode(token)
            console.log("Update Reducer"+updatedUser)
            newUser = {
                ...state,
                _id: updatedUser._id,
                token: token,
                name: updatedUser.firstName,
                email: updatedUser.email,
                phoneNumber: updatedUser.phoneNumber,
                lastName: updatedUser.lastName,
                password: updatedUser.password
            }
            break
        default:
            newUser = {...state}
    }

    // return Object.assign({}, state, newUser)
    return Object.assign({}, newUser)
}

export default authReducer