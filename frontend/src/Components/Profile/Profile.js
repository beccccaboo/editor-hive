import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux"
import {Box, Button, Link, TextField, Typography} from "@mui/material";
import {updateUserAction, updatePwdAction} from "../../Store/Actions/Auth";
import {useNavigate} from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
const Profile = ()=>{
    const auth = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isUpdate, setIsUpdate] = useState(false)
    const [isUpdatePwd, setIsUpdatePwd] = useState(false)
    const [updatedUser, setUpdatedUser] = useState({
        firstName: auth.name,
        lastName: auth.lastName,
        phoneNumber: auth.phoneNumber,
        email: auth.email
    })
    const [updatedPwd, setUpdatedPwd] = useState({password: ""})

    const updateProfile = () => {
        dispatch(updateUserAction(auth._id, updatedUser))
        console.log(auth)
        setIsUpdate(false)
    }

    const updatePwd = () => {
        dispatch(updatePwdAction(auth._id, updatedPwd))
        console.log(updatedPwd)
        setIsUpdatePwd(false)
    }

    const innerBoxStyle = {
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        margin:"auto",
        minWidth:400,

    }

    const outerBoxStyle = {
        flex:2,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        margin:"auto",
        width:400,
        borderRadius : 3,
        padding : 3,
        boxShadow:2
    }

    const buttonBoxStyle = {
        display:"flex",
        flexDirection:"row",
        marginTop:"20px"
    }

    return(
        <Box>
            {isUpdatePwd ? (
                <>
                <Typography variant={"h4"} padding={3} textAlign={"center"}>{auth.name}, Enter Your New Password</Typography>
                <Box sx={outerBoxStyle}>
                    <TextField variant={"outlined"} margin={"normal"} type={"password"} placeholder={'Password'} value={updatedPwd.password} onChange={(e)=> setUpdatedPwd({...updatedPwd, password: e.target.value})} ></TextField>
                    <Box sx={buttonBoxStyle}>
                        <Button sx={{background: "#e0e8f8", color: "#1e227f"}} variant={"contained"} onClick={updatePwd}>Submit</Button>
                        <Button sx={{marginLeft:"10px", background: "#e0e8f8", color: "#1e227f"}} variant={"contained"} onClick={()=>setIsUpdatePwd(false)}>Cancel</Button>
                    </Box>
                </Box>
                </>
            ) : (
                <>
                {isUpdate ? (
                    <>
                        <Typography variant={"h4"} padding={3} textAlign={"center"}>{auth.name}, Update Your Profile</Typography>
                        <Box sx={outerBoxStyle}>
                            <Box sx={innerBoxStyle}>
                                <Typography variant={"h6"} margin={"auto"} pr={"10px"} textAlign={"center"}>First Name : </Typography>
                                <TextField variant={"outlined"} margin={"normal"} type={"text"} placeholder={'First Name'} value={updatedUser.firstName} onChange={(e)=> setUpdatedUser({...updatedUser, firstName: e.target.value})} ></TextField>
                            </Box>

                            <Box sx={innerBoxStyle}>
                                <Typography variant={"h6"} margin={"auto"} pr={"10px"} textAlign={"center"}>Last Name : </Typography>
                                <TextField variant={"outlined"} margin={"normal"} type={"text"} placeholder={'Last Name'} value={updatedUser.lastName} onChange={(e)=> setUpdatedUser({...updatedUser, lastName: e.target.value})} ></TextField>
                            </Box>

                            <Box sx={innerBoxStyle}>
                                <Typography variant={"h6"} margin={"auto"} pr={"10px"} textAlign={"center"}>Contact : </Typography>
                                <TextField variant={"outlined"} margin={"normal"} type={"text"} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} placeholder={'Contact '} value={updatedUser.phoneNumber} onChange={(e)=> setUpdatedUser({...updatedUser, phoneNumber: e.target.value})} ></TextField>
                            </Box>

                            <Box sx={innerBoxStyle}>
                                <Typography variant={"h6"} margin={"auto"} pr={"10px"} textAlign={"center"}>Email ID : </Typography>
                                <TextField variant={"outlined"} margin={"normal"} type={"email"} placeholder={'Email'} value={updatedUser.email} onChange={(e)=> setUpdatedUser({...updatedUser, email: e.target.value})} disabled={true}></TextField>
                            </Box>
                            {/*<TextField variant={"outlined"} margin={"normal"} type={"password"} placeholder={'Password'} value={updatedUser.password} onChange={(e)=> setUpdatedUser({...updatedUser, password: e.target.value})} ></TextField>*/}
                            <Box sx={buttonBoxStyle}>
                                <Button sx={{background: "#e0e8f8", color: "#1e227f"}} variant={"contained"} onClick={updateProfile}>Submit</Button>
                                <Button sx={{marginLeft:"10px", background: "#e0e8f8", color: "#1e227f"}} variant={"contained"} onClick={()=>setIsUpdate(false)}>Cancel</Button>
                            </Box>
                        </Box>
                    </>
                    ) : (
                        <>
                            <Typography variant={"h4"} padding={3} textAlign={"center"}>Your Profile</Typography>
                            <Box sx={outerBoxStyle}>

                                <Box sx={innerBoxStyle}>
                                     <h2>Name:</h2><h4 >{auth.name} {auth.lastName}</h4>
                                    {/*<Typography variant={"h5"} margin={"auto"} padding={3}> </Typography>*/}
                                    {/*/!*<Typography variant={"h5"} margin={"auto"} textAlign={"center"}>{auth.name}</Typography>*!/*/}
                                </Box>



                                <Box sx={innerBoxStyle}>
                                    <h2>Contact:</h2><h4>{auth.phoneNumber}</h4>
                                    {/*<Typography variant={"h5"} margin={"auto"} textAlign={"center"}>{auth.phoneNumber}</Typography>*/}
                                </Box>

                                <Box sx={innerBoxStyle}>
                                    <h2>Email:</h2> <h4>{auth.email}</h4>
                                    {/*<Typography variant={"h5"} margin={"auto"} textAlign={"center"}>{auth.email}</Typography>*/}
                                </Box>

                            <Box sx={buttonBoxStyle}>
                            <Button sx={{margin: "auto", background: "#e0e8f8", color: "#1e227f"}} variant={"contained"} onClick={()=>setIsUpdate(true)}>Update Profile</Button>
                            <Button sx={{marginLeft: "20px", background: "#e0e8f8", color: "#1e227f"}} variant={"contained"} onClick={()=>setIsUpdatePwd(true)}>Update Password</Button>
                            </Box>
                            </Box>
                        </>
                    )}
                </>
            )}

        </Box>
    )
}

export default Profile