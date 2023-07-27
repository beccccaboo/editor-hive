import {signUp, signIn, getUser, updateUser, updatePwd} from "../../services/auth-service";
import {toast} from "react-toastify";


export const signUpAction = (user) => {
    return(dispatch) => {
        //Services file calls the API (post request)
        signUp(user)
            .then(res => {
                return res.json().then(token => {
                    if(res.ok) {
                        localStorage.setItem("token", token)
                        dispatch({
                            type: "SIGN_UP",
                            token: token
                        })
                    } else {
                        if(token.message)
                            throw new Error(token.message)
                        else
                            throw new Error(JSON.stringify(token))
                    }
                })
            })
            .catch(error => {
                console.log(error)
                toast.error(error.toString(), {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
    }
}

export const signInAction = (creds) => {
    return(dispatch) => {
        //Services file calls the API (POST request)
        signIn(creds)
            .then(res => {
                return res.json().then(token => {
                    if(res.ok) {
                        console.log("Sign-In Action token: "+token)
                        localStorage.setItem("token", token)
                        dispatch({
                            type: "SIGN_IN",
                            token: token
                        })
                    } else {
                        throw new Error(token.message);
                    }
                })
                })
            .catch(error => {
                console.log(error)
                toast.error(error.toString(), {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
    }
}

export const loadUser = () => {
    return(dispatch, getState) => {
        const token = getState().user.token
        if(token){
            dispatch({
                type: "USER_LOADED",
                token
            })
        } else return null
    }
}

export const signOutAction = () => {
    return(dispatch) => {
        localStorage.removeItem("token")
        dispatch({
            type: "SIGN_OUT"
        })
    }
}

export const updateUserAction = (id, user) => {
    return(dispatch) => {
        updateUser(id, user)
            .then(res => {
                return res.json().then(token => {
                    if(res.ok){
                        dispatch({
                            type: "UPDATE_USER",
                            token: token
                        })
                    } else throw new Error(token.message);
                })
            })
            .catch(error => {
                console.log(error)
                toast.error(error.toString(), {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
    }
}

export const updatePwdAction = (id, pwd) => {
    return(dispatch) => {
        updatePwd(id, pwd)
            .then(res => {
                return res.json().then(token => {
                    if(res.ok){
                        dispatch({
                            type: "UPDATE_PWD",
                            token: token
                        })
                    } else throw new Error(token.message);
                })
            })
            .catch(error => {
                console.log(error)
                toast.error(error.toString(), {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
    }
}

