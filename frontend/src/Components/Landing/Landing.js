import React, { useState } from "react";
import Footer from "../Footer/Footer";
import Login from "../../Images/main.gif"
import colab from "../../Images/united.png"
import all from "../../Images/pc.png"
import grp from "../../Images/meeting.png"
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import map from "../../Images/maps.jpg"


import {
    createTheme,
    responsiveFontSizes,
} from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import './landing.scss';
import { Box, Button, Link, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import ChatModal from "../chatModal/ChatModal";
import ContactModal from "../ContactModal/ContactModal";


let theme = createTheme();
theme = responsiveFontSizes(theme);
const Landing = () => {
    const navigate = useNavigate();
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down("md"))
    const [message, setMessage] = useState("")
    const [user, setUser] = useState("")
    const [contactModal, setContactModal] = useState(false)
    const modalToggle = () => {
        setContactModal(!contactModal)
    }

    const handleSubmit = async () => {
        await fetch('http://localhost:8081/mail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: "codeent008@gmail.com",
                message: message,
                user: user
            })
        })
    }
    return (
        <div className="form" >
            <Box
                display="flex"
                padding={3}
                alignItems="center"
                justifyContent="center"
                overflow={"hidden"}
            >

                <Box
                    bgcolor={"#fff"}
                    padding={5}
                    mr={5}
                    borderRadius={3}
                    boxShadow={3}
                    justifyContent="center"
                // boxShadow={"5px 5px 5px #ccc"}

                >

                    <Box display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography variant="body">
                            {<LightbulbIcon />} BRING YOUR IDEA TOGETHER
                        </Typography>

                    </Box>
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center">
                        <Typography>
                            <h1>Leveling up your team's productivity.</h1>
                            <h4>Simple and effortless Collabration without any limitation.
                                Get your team goals straightforward
                            </h4>
                        </Typography>
                    </Box>
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button variant={"contained"} onClick={() => navigate("/registration")}>Get Started</Button>
                    </Box>
                </Box>
                {isSmall ? (<></>) : (
                    <Box
                        component={"img"}
                        display="flex"
                        gap="10px"
                        flexDirection={"row"}
                        padding={1}
                        mt={1}
                        overflow={"hidden"}
                        // sx={{ width: 200, height: 200 }}
                        src={Login}>
                    </Box>
                )}


            </Box >
            <Box mt={10}>
                <Typography sx={{ fontSize: "18px", paddingLeft: "10px" }} variant={"h1"} color={"black"}>
                    <h1 ><center>FEATURED</center></h1>

                </Typography>
                <h2><center>Why we're different</center></h2>


                {isSmall ? (<>
                    <Box // display="flex"
                        alignItems="center"
                        justifyContent="center"
                        mb={10}
                    //  flexDirection={"row"}

                    >


                        <Box display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection={"column"}
                            padding={1}
                            gap="5px"
                            mt={1}>
                            <Box
                                component={"img"}
                                display="flex"
                                flex={"1"}
                                flexDirection={"row"}
                                gap="10px"
                                width={"15vw"}
                                alignItems={"center"}
                                src={colab}

                                justifyContent={"center"}
                                height={"10vw"}
                                padding={1}
                                mt={1}   >

                            </Box>
                            <Box display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap="5px"
                                flex={1}
                                mt={1}>
                                <Typography sx={{ fontSize: "18px", paddingLeft: "10px" }} variant={"h4"} color={"black"}>
                                    <h1 ><center>Collaboration</center></h1>
                                    <p >Share documents with individuals or large groups of people.</p>
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection={"column"}
                            padding={1}
                            gap="5px"
                            m={1}>
                            <Box
                                component={"img"}
                                display="flex"
                                flexDirection={"row"}
                                gap="10px"
                                width={"15vw"}
                                flex={1}
                                height={"10vw"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                padding={1}
                                src={grp}
                                m={1}   >

                            </Box>
                            <Box display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap="5px"
                                m={1}>
                                <Typography sx={{ fontSize: "18px", paddingLeft: "10px" }} variant={"h4"} color={"black"}>
                                    <h1 ><center>Group Creation</center></h1>
                                    <p>You can share with people inside or outside your organization.</p>
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection={"column"}
                            padding={1}
                            gap="5px"
                            m={1}>
                            <Box
                                component={"img"}
                                display="flex"
                                flex={1}
                                flexDirection={"row"}
                                gap="5px"
                                alignItems={"center"}
                                justifyContent={"center"}
                                width={"15vw"}
                                height={"10vw"}
                                src={all}
                                padding={1}
                                m={1}   >
                            </Box>
                            <Box
                                alignItems="center"
                                justifyContent="center"
                                gap="10px"
                                m={1}>
                                <Typography sx={{ fontSize: "18px", paddingLeft: "10px" }} variant={"h4"} color={"black"}>
                                    <h1 ><center>All in one Place</center></h1>
                                    <p>People can make changes at the same time, and you can see changes as they happen.</p>
                                </Typography>
                            </Box>

                        </Box>


                    </Box>

                </>) : (
                    <Box display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection={"row"}
                        flexGrow={1}
                        flex={1}

                    >


                        <Box
                            display="flex"
                            flex={"1 1 0px"}
                            alignItems="center"
                            justifyContent="center"
                            flexDirection={"column"}
                            padding={1}
                            gap="5px"
                        // mt={1}
                        >
                            <Box
                                component={"img"}
                                // display="flex"
                                // flexDirection={"row"}
                                width={"15vw"}
                                flex={"1 1 0px"}
                                height={"10vw"}


                                src={colab}

                            >

                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"

                            >
                                <Typography sx={{ fontSize: "18px", paddingLeft: "10px" }} variant={"h4"} color={"black"}>
                                    <h1 ><center>Collaboration</center></h1>
                                    <p >Share documents with individuals or large groups of people.</p>
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            flex={"1 1 0px"}
                            alignItems="center"
                            justifyContent="center"
                            display="flex"
                            flexDirection={"column"}
                            padding={1}
                            gap="5px"
                        >
                            <Box
                                component={"img"}
                                // display="flex"
                                flexDirection={"row"}
                                width={"15vw"}
                                flex={"1 1 0px"}
                                height={"10vw"}
                                alignItems={"center"}
                                justifyContent={"center"}

                                src={grp}
                            >

                            </Box>
                            <Box
                                //  display="flex"
                                alignItems="center"
                                flex={"1 1 0px"}
                                justifyContent="center"

                            >
                                <Typography sx={{ fontSize: "18px", paddingLeft: "10px" }} variant={"h4"} color={"black"}>
                                    <h1 ><center>Group Creation</center></h1>
                                    <p>You can share with people inside or outside your organization.</p>
                                </Typography>
                            </Box>
                        </Box>
                        <Box

                            flex={"1 1 0px"}
                            alignItems="center"
                            justifyContent="center"
                            display="flex"
                            flexDirection={"column"}

                        >
                            <Box
                                component={"img"}
                                // display="flex"

                                width={"15vw"}
                                flex={"1 1 0px"}
                                height={"10vw"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                // m={1}   
                                src={all}
                            >
                            </Box>
                            <Box
                                //  display="flex"
                                alignItems="center"
                                justifyContent="center"
                                flex={"1 1 0px"}

                            >
                                <Typography sx={{ fontSize: "18px", paddingLeft: "10px" }} variant={"h4"} color={"black"}>
                                    <h1 ><center>All in one Place</center></h1>
                                    <p>People can make changes at the same time, and you can see changes as they happen.</p>
                                </Typography>
                            </Box>

                        </Box>


                    </Box>

                )}
            </Box>
            {isSmall ? (<><Box display="flex"
                flex={1}
                borderRadius={3}
                boxShadow={2}
                flexDirection={"column"}
                // maxWidth={400}
                alignItems="center"

                // position="relative"
                bgcolor="white"
                // sx={{ zIndex: 'modal', left: '60%' }}
                justifyContent="center"


            >
                <form onSubmit={handleSubmit}>
                    <Typography sx={{ fontSize: "18px", paddingLeft: "10px" }} variant={"h1"} color={"black"}>
                        Contact Us
                    </Typography>
                    <TextField label={"Name"} variant={"outlined"} margin={"normal"} type={"text"} placeholder={'Name'} onChange={(e) => setUser(e.target.value)}></TextField>
                    <TextField label={"Contact"} variant={"outlined"} margin={"normal"} type={"text"}  ></TextField>
                    <TextField label={"Email"} variant={"outlined"} margin={"normal"} type={"email"} placeholder={'Email'}  ></TextField>
                    <TextField label={"Message"} variant={"outlined"} margin={"normal"} type={"text"} placeholder={'Message'} onChange={(e) => setMessage(e.target.value)}></TextField>
                    <Button variant={"contained"} sx={{ margin: 3, color: "#fff" }} type={"submit"} >Send Message</Button>
                </form>
            </Box>

            </>) : (
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Button variant={"contained"} sx={{ margin: 3, color: "#fff" }} onClick={modalToggle} >Contact Us</Button>
                </Box>
                )
            }

            {
                contactModal ?
                    <ContactModal modalToggleFunction={modalToggle} />
                    :
                    null
            }
            <Footer></Footer>
        </div >

    )
}

export default Landing