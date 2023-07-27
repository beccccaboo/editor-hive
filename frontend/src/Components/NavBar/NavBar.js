import React, {useEffect, useState} from 'react'
import {AppBar, Typography, Toolbar, Button, useMediaQuery, useTheme, Link, Box, Menu, Tab, Tabs} from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Hamburger from "./Hamburger/Hamburger";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signOutAction} from "../../Store/Actions/Auth";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import {updateTabValue} from "../../Store/Actions/Tab";
import tab from "../../Store/State/Tab";
import Modal from "../modal/Modal";
import Group from "../group/Group";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {color} from "quill/ui/icons";

const pages = ["Login", "SignUp"]
const hoverStyle = {
    color: "#e0e8f8",
    textDecoration: "none",
    "&:hover": {
        cursor: "pointer",
        textDecoration: "underline"
    }
}
const NavBar = () => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down("lg")) //Check if screen size is small
    const navigate = useNavigate()
    const auth = useSelector(state => state.user)
    const tab = useSelector(state => state.tab)
    const dispatch = useDispatch()
    const handleSignOut = () => {
        dispatch(signOutAction()) //Call to action for removing existing token
        navigate("/")
    }
    const showProfile = () =>{navigate("/profile")}
    const [tabValue, setTabValue] = useState('one');
    const [taskModal, setTaskModal] = useState(false)
    const [groupModal, setGroupModal] = useState(false)
    console.log("tabValue: "+tabValue)

    useEffect(()=>{
        setTabValue(tab.value)
    },[tab])
    const handleChange = (str) => {
        setTabValue(str)
        navigate("/home")
        dispatch(updateTabValue(str))
    }
    // const tabValue = useSelector(state => state.tab)

    const toggleModal = () => {
        setTaskModal(!taskModal)
    }

    const toggleGroupModal = () => {
        setGroupModal(!groupModal)
    }
  return (

    <AppBar position={"sticky"} sx={{background: "#1e227f"}}>
        <Toolbar>
            <Typography sx={{fontSize: "1.5rem", paddingLeft: "10px"}} variant={"h4"} color={"#e0e8f8"}>
                <Link sx={hoverStyle} onClick={() => navigate("/")}>Editor Hive</Link>
            </Typography>
            {isSmall ? (
                <>
                    <Hamburger></Hamburger>
                </>
            ): <>
                {auth.email ? (
                    <>
                        <Tabs
                            value={tabValue}
                            indicatorColor="primary"
                            aria-label="secondary tabs example"
                            className="tabs"
                            sx={{marginLeft:"auto"}}
                        >
                            {/* <Tab className="tab" onClick={() => handleChange("one")} value="one" label={<span style={{color: "white"}}>All Documents</span>} /> */}
                            <Tab className="tab" onClick={() => handleChange("two")} value="two" label={<span style={{color: "white"}}>Team Documents</span>} />
                            <Tab className="tab" onClick={() => handleChange("three")} value="three" label={<span style={{color: "white"}}>Private Documents</span>} />
                        </Tabs>

                        &nbsp;

                        <PostAddIcon fontSize={"large"} onClick={toggleModal} sx={hoverStyle}></PostAddIcon>
                        &nbsp;
                        <GroupAddIcon fontSize={"large"} onClick={toggleGroupModal} sx={hoverStyle}></GroupAddIcon>


                        <AccountCircleIcon onClick={showProfile} fontSize={"large"} sx={{"&:hover": {
                                cursor: "pointer",
                                textDecoration: "underline"
                            }, color: "#e0e8f8", marginLeft: "auto"}}></AccountCircleIcon>
                        <ExitToAppIcon onClick={handleSignOut} fontSize={"large"} sx={{"&:hover": {
                                cursor: "pointer",
                                textDecoration: "underline"
                            }, color: "#e0e8f8", marginLeft: "10px"}}></ExitToAppIcon>
                        <Box>
                            {taskModal ? <Modal toggleModalFunction={toggleModal} /> : null}
                        </Box>
                        <Box>
                            {groupModal ? <Group toggleModalFunction={toggleGroupModal} />:null}
                        </Box>
                    </>
                ) : (
                    <>
                        <Button sx={{marginLeft: "auto", background: "#e0e8f8", color: "#1e227f"}} variant={"contained"} onClick={() => navigate("/login")}>Login</Button>
                        <Button sx={{marginLeft: "10px", background: "#e0e8f8", color: "#1e227f"}} variant={"contained"} onClick={() => navigate("/registration")}>SignUp</Button>
                    </>
                )}
            </>
            }
        </Toolbar>
    </AppBar>
  )
}

export default NavBar