import React, { useState, useEffect } from 'react'
import "./ChatModal.scss"
import {Button, TextField, Typography, Grid, List, ListItem, ListItemText, Fab, Divider} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, EmailShareButton, EmailIcon } from "react-share";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Modal from '@mui/material/Modal';
import {Box} from "@mui/system";
import {toast} from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import {useSelector} from "react-redux";

const ChatModal = ({ documentId, sender, chatModalToggleFunction }) => {
  
  const [open, setOpen] = React.useState(true);
  const [chat, setChat] = useState([])
  const [chatMessage, setChatMessage] = useState("")
  const [textMessage, setTextMessage] = useState("")
    const auth = useSelector(state => state.user)
  const fetchChats = async () => {
    console.log("Fetching Chats.....")
    await fetch(`http://localhost:8081/message/${documentId}`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => {setChat(data)
        console.log(data)})
        .catch(err => console.log(err))

}

const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:8081/message', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: chatMessage,
            docId: documentId,
            from: sender
            // createdAt: Date.now()
        })
    })
        .then(res => res.json())
        .then(data => {setChat(data)
            console.log(data)})
        .catch(err => console.log(err))

    fetchChats()
    setChatMessage("")
}

useEffect(() => {
  fetchChats()
  console.log(chat)
}, [])




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


  return (

    <div>
      <Modal open={open}
             onClose={chatModalToggleFunction}
             aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Grid item xs={9}>
                <List >
                    <Typography variant={"h4"} align={"center"}>Chat</Typography>
                    {(chat.length>0) ?
                        chat.map((msg, index)=>{
                            return(
                                <ListItem key={index}>
                            <Grid container>
                                {
                                    (msg.from!==auth.email) ? (
                                        <><Grid item xs={12}>
                                            <ListItemText align="left" primary={msg.message} sx={{backgroundColor: "#dad8d8", borderRadius:"10px 10px 10px 2px", padding:"4px" }}></ListItemText>
                                            <ListItemText align="left" primary={msg.from} sx={{color:"grey", size: "small"}}></ListItemText>
                                        </Grid></>
                                    ) : (<>
                                        <Grid item xs={12}>
                                            <ListItemText align="right" primary={msg.message} sx={{backgroundColor: "#afcbff", borderRadius:"10px 10px 2px 10px", padding:"4px" }}></ListItemText>
                                            <ListItemText align="right" primary={msg.from} sx={{color:"grey", size: "small"}}></ListItemText>
                                        </Grid>
                                    </>)
                                }
                            </Grid>
                        </ListItem>)
                    })
                     : 
                    <></>
                    }
                    
                    
                </List>
                <Divider />
            
            </Grid>
        <form action="" className='form-wrapper' onSubmit={handleSubmit}>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <TextField className='form-input' id="outlined-basic" label="Send Message" variant="outlined" onChange={e => setChatMessage(e.target.value)} value={chatMessage}/>
                        {/*<input type="submit" className='form-btn' value="Submit" />*/}
                        <Button type={"submit"} variant="contained" sx={{margin: "20px"}} endIcon={<SendIcon />}>
                            Submit
                        </Button>
                    </Box>
                </form>
        </Box>
      </Modal>
    </div>
  )
}

export default ChatModal