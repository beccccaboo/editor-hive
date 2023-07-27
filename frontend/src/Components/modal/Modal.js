import React,{useState} from 'react'
import "./Modal.scss"
import {Box, Button, TextField, Typography} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import CreatableSelect from 'react-select/creatable'
let titleDocument = ""
export const setUserDocumentTitle = (title) => {
    titleDocument = title
    return
}


export const getDocumentTitle = () => titleDocument
const NewModal = ({ toggleModalFunction }) => {
    const [documentTitle, setDocumentTitle] = useState('')
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate()

    const setDocumentDetails = () => {
        console.log("clicked")
        setUserDocumentTitle(documentTitle)
        toggleModalFunction()
        navigate("/new")
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        borderRadius: 2,
        p: 4,
    };
    
    return (
        
        
      <div >
            <Modal
                open={open}
                   onClose={toggleModalFunction}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Box display={"flex"} flexDirection={"column"}>
                        <Typography variant={"h4"} padding={3} textAlign={"center"}>New Private Document</Typography>
                    <TextField label={"Title"} variant={"outlined"} type={"text"} placeholder={'Title'} onChange={(e) => setDocumentTitle(e.target.value)}  value={documentTitle} required ></TextField>
                    <Button variant="contained" sx={{margin: "20px"}} endIcon={<SendIcon />} onClick={() => setDocumentDetails() }>
                        Create
                    </Button>
                    </Box>
                </Box>
            </Modal>

        </div>
    )
}

export default NewModal