import {Box, Button, TextField, Typography} from "@mui/material";

import React, { useState, useEffect } from 'react'
import Modal from "@mui/material/Modal";

const ContactModal = ({modalToggleFunction})=>{
    const [open, setOpen] = React.useState(true);
    const [message, setMessage] = useState("")
    const [user, setUser] = useState("")
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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#fff',
        border: '1px solid #000',
        boxShadow: 24,
        borderRadius: 2,
        p: 4,
    };

    return(
        <Modal open={open}
               onClose={modalToggleFunction}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description">
            <Box sx={style}>
        <Box display="flex" flexdirection="column" alignItems="center" justifyContent="center">
            <form onSubmit={handleSubmit} className="contact-form-wrapper" >

                <Typography sx={{ fontSize: "18px", paddingLeft: "10px" }} variant={"h1"} color={"black"}>
                    Contact Us
                </Typography>
                <TextField label={"Name"} variant={"outlined"} margin={"normal"} type={"text"} placeholder={'Name'} sx={{width:"100%"}} onChange={(e) => setUser(e.target.value)}></TextField>
                <TextField label={"Contact"} variant={"outlined"} margin={"normal"} type={"text"} sx={{width:"100%"}} ></TextField>
                <TextField label={"Email"} variant={"outlined"} margin={"normal"} type={"email"} placeholder={'Email'} sx={{width:"100%"}}  ></TextField>
                <TextField label={"Message"} variant={"outlined"} margin={"normal"} type={"text"} placeholder={'Message'} sx={{width:"100%"}} onChange={(e) => setMessage(e.target.value)}></TextField>
                <Button variant={"contained"} type={"submit"}>Send Message</Button>

            </form>
        </Box>
            </Box>
        </Modal>
    )
}

export default ContactModal
