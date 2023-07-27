import "./MainForm.scss"
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { signInAction } from "../../Store/Actions/Auth";
// import SignUpForm from './SignUpForm';
import LoginImg from "../../Images/form.jpeg"
import {redirect, useNavigate} from "react-router-dom";
import {Box, Button, Link, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import { Email } from "@mui/icons-material";

const SignInForm = () => {
    const navigate = useNavigate();
    const [creds, setCreds] = useState({
        email: "",
        password: ""
    })
    const dispatch = useDispatch()
    const auth = useSelector(state => state.user)
    console.log("Sign In Form State: "+ JSON.stringify(auth))
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down("md")) //Check if screen size is Medium
    const submitForm = (e) => {
        e.preventDefault()
        dispatch(signInAction(creds))
            setCreds({
            email: "",
            password: ""
        })
    }

    if(auth.email) navigate("/home")
    //HTML for the Sign-in Form
    return (

        <form className="formAdd" onSubmit={submitForm}>
            <Box
                display="flex"
                flexDirection={"row"}
                bgcolor={"#fff"}
                maxWidth={1000}
                alignItems={"center"}
                justifyContent={"center"}
                padding={3}
                margin={"auto"}
                mt={3}
                mb={3}
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
                    <Typography variant={"h4"} padding={2} textAlign={"center"}>Log In</Typography>
                    <TextField label ={"Email"} variant={"outlined"} margin={"normal"} type={"email"} placeholder={'Email'} value={creds.email} onChange={(e) => setCreds({ ...creds, email: e.target.value })} required ></TextField>
                    <TextField label ={"Password"} variant={"outlined"} margin={"normal"} type={"password"} placeholder={'Password'} value={creds.password} onChange={(e) => setCreds({ ...creds, password: e.target.value })} required></TextField>
                    <Button variant={"contained"} sx={{marginTop:3, color: "#fff"}} type={"submit"}>Log In</Button>
                    <Typography variant={"body1"} pt={3} textAlign={"center"}>
                        Don't you have an account?
                    </Typography>
                    <Link onClick={() => navigate("/registration")} variant="body2" style={{cursor: "pointer"}}>Join Editor Hive</Link>
                </Box>
            </Box>
        </form>
    )

}

export default SignInForm;