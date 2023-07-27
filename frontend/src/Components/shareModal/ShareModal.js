import React from 'react'
import "./ShareModal.scss"
import {Button, Typography} from '@mui/material';
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

const ShareModal = ({ shareModalToggleFunction, docId, sharingDocumentLink }) => {
  const [editAccess, setEditAccess] = React.useState('');
  const [open, setOpen] = React.useState(true);

  const handleChange = async (event) => {
    setEditAccess(event.target.value)
    
    await fetch(`http://localhost:8081/doc/${docId}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        editAccess: event.target.value
      })
    })
  };

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

  const copyMessage=() =>{
    toast("Link Copied to Clipboard", {
      position: toast.POSITION.BOTTOM_CENTER
    })
  }

  return (

    <div>
      <Modal open={open}
             onClose={shareModalToggleFunction}
             aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description"
      >
        {/*<Button variant="contained" className="close-modal-btn" startIcon={<CloseIcon />} onClick={shareModalToggleFunction}> Close </Button>*/}
        <Box sx={style} display={"flex"} flexDirection={"column"} gap={1.5}>
          <Typography variant={"h4"} textAlign={"center"}>Share Document</Typography>
          <Box display={"flex"} alignItems={"center"}>
            <h5>{sharingDocumentLink}</h5>
            <CopyToClipboard text={sharingDocumentLink}>
              <button onClick={copyMessage} style={{cursor: "pointer", height: "70%", padding:"4px", margin: "10px", backgroundColor: "#1e227f", color:"#fff"}}><ContentPasteOutlinedIcon  /></button>
            </CopyToClipboard>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <FormControl sx={{ m: 1, minWidth: 350 }}>
              <InputLabel id="demo-select">Everyone With Link Can?</InputLabel>
              <Select
                labelId="demo-select"
                id="demo-select"
                className='accesSelector'
                value={editAccess}
                label="Everyone With Link Can?"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"View"}>View</MenuItem>
                <MenuItem value={"Edit"}>Edit</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box display={"flex"} justifyContent={"center"} gap={2}>
            {/*<div className="share-btn-wrapper">*/}
              <FacebookShareButton url={sharingDocumentLink}>
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>
              <WhatsappShareButton url={sharingDocumentLink}>
                <WhatsappIcon size={40} round={true} />
              </WhatsappShareButton>
              <EmailShareButton url={sharingDocumentLink}>
                <EmailIcon size={40} round={true} />
              </EmailShareButton>
            {/*</div>*/}
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default ShareModal