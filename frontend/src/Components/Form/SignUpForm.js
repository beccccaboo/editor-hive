
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { signUpAction } from "../../Store/Actions/Auth";
import LoginImg from "../../Images/form.jpeg"
import SignInForm from './SignInForm';
import { redirect, useNavigate } from "react-router-dom";
import {Box, Button, Link, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";

const SignUpForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: ""
        // confirmPassword: ""
    })

    const dispatch = useDispatch()
    const auth = useSelector(state => state.user)
    console.log("Sign Up Form State: "+ JSON.stringify(auth))
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down("md")) //Check if screen size is Medium

    const submitForm = (e) => {
        e.preventDefault()
        dispatch(signUpAction(user))
        setUser({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: ""
            // confirmPassword: ""
        })
    }

    if(auth.email) navigate("/home")
    //HTML for the SignUpForm
    return (
        <form className="formAdd" onSubmit={submitForm}>
            <Box
                display="flex"
                flexDirection={"row"}
                bgcolor={"#fff"}
                maxWidth={1000}
                alignItems={"center"}
                justifyContent={"center"}
                margin={"auto"}
                mt={3}
                mb={3}
                padding={3}
                borderRadius={3}
                boxShadow={2}
            >
                {isSmall ? (<></>) : (
                    <Box
                        component={"img"}
                        flex={0.5}
                        sx={{width: 0.7, height: 0.6}}
                        src={LoginImg}>
                    </Box>
                )}
                <Box
                    flex={2}
                    display="flex"
                    flexDirection={"column"}
                    maxWidth={400}
                    alignItems={"center"}
                    justifyContent={"center"}
                    margin={"auto"}
                    >
                    <Typography  variant={"h4"} padding={2} textAlign={"center"}>Register</Typography>
                    <TextField  label ={"First Name"} variant={"outlined"} margin={"normal"} type={"text"} placeholder={'First Name'} value={user.firstName} onChange={(e)=> setUser({...user, firstName: e.target.value})} required></TextField>
                    <TextField label ={"Last Name"} variant={"outlined"} margin={"normal"} type={"text"} placeholder={'Last Name'} value={user.lastName} onChange={(e)=> setUser({...user, lastName: e.target.value})} required></TextField>
                    <TextField label ={"Contact"} variant={"outlined"} margin={"normal"} type={"text"} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} placeholder={'Contact '} value={user.phoneNumber} onChange={(e)=> setUser({...user, phoneNumber: e.target.value})} required></TextField>
                    <TextField label ={"Email"} variant={"outlined"} margin={"normal"} type={"email"} placeholder={'Email'} value={user.email} onChange={(e)=> setUser({...user, email: e.target.value})} required ></TextField>
                    <TextField label ={"Password"} variant={"outlined"} margin={"normal"} type={"password"} placeholder={'Password'} value={user.password} onChange={(e)=> setUser({...user, password: e.target.value})} required></TextField>
                    {/*<TextField variant={"outlined"} margin={"normal"} type={"password"} placeholder={'Confirm Password'} value={user.confirmPassword} onChange={(e)=> setUser({...user, confirmPassword: e.target.value})} required></TextField>*/}
                    <Button variant={"contained"} sx={{marginTop:3, color: "#fff"}} type={"submit"}>Sign Up</Button>
                    <Typography variant={"body1"} pt={3} textAlign={"center"}>
                        Already have an account?
                    </Typography>
                    <Link onClick={() => navigate("/login")} variant="body2" style={{cursor: "pointer"}}>Log In</Link>
                </Box>
            </Box>
        </form>

    )
}

export default SignUpForm;