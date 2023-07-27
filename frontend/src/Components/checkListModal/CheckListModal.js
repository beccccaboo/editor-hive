import React, { useState, useEffect } from 'react'
import "./CheckListModal.scss";
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';

import MenuIcon from '@mui/icons-material/Menu';
import DirectionsIcon from '@mui/icons-material/Directions';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Modal from "@mui/material/Modal";
import {Button, Typography} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";


const CheckListModal = ({ documentId, modalToggleFunction }) => {
    const [checkLists, setCheckLists] = useState([])
    const [checkListTitle, setCheckListTitle] = useState("")
    const [open, setOpen] = React.useState(true)

    const fetchCheckLists = async () => {
        console.log("Fetching Tasks.....")
        await fetch(`http://localhost:8081/checklist/${documentId}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => setCheckLists(data))
            .catch(err => console.log(err))

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

    useEffect(() => {
        fetchCheckLists()
    }, [])


    const deleteCheckList = async (checkListIdToDelete) => {
        console.log(checkListIdToDelete)
        await fetch(`http://localhost:8081/checklist/${checkListIdToDelete}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => setCheckLists(checkLists.filter(i => i._id !== data._id)))
            .catch(err => console.log(err))
    }

    const updateStatusInState = (data) => {

        const newState = checkLists.map(obj => {
            if (obj._id === data._id) {
              return {...obj, completed: data.completed};
            }
            return obj;
          });
          setCheckLists(newState);
    }

    const updateCheckListStatus = async (checkListIdToUpdate) => {
        console.log("Update status method called")
        await fetch(`http://localhost:8081/checklist/${checkListIdToUpdate}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => updateStatusInState(data))
            .catch(err => console.log(err))
    }

    const submitCheckListData = async (e) => {
        e.preventDefault()
        await fetch('http://localhost:8081/checklist', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: checkListTitle,
                documetId: documentId
            })
        })
            .then(res => res.json())
            .then(data => setCheckLists([...checkLists, data]))
            .catch(err => console.log(err))

        setCheckListTitle("")
    }

    return (
        <div>
            <Modal open={open}
                   onClose={modalToggleFunction}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description">
                {/*<IconButton className='btn-icon' onClick={modalToggleFunction} color="primary" aria-label="upload picture" component="label">*/}
                {/*    X*/}
                {/*</IconButton>*/}

                <Box sx={style} display={"flex"} flexDirection={"column"} gap={1.5}>
                    {
                        checkLists.length > 0 ?
                            <>
                            <Typography variant={"h4"} textAlign={"center"} >Checklist</Typography>
                            {checkLists.map((checkList, index) => {
                                return (
                                    <Paper
                                        component="form"
                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                                        key={index}
                                    >
                                        <IconButton sx={{ p: '10px' }} onClick={() => updateCheckListStatus(checkList._id)} aria-label="menu" title='Check Task'>
                                            <CheckCircleOutlineOutlinedIcon />
                                        </IconButton>
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            value={checkList.title}
                                            className={checkList.completed ? "check-list-title" : null}
                                            inputProps={{ 'aria-label': 'Check List Task' }}
                                        />
                                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                        <IconButton onClick={() => deleteCheckList(checkList._id)} color="primary" sx={{ p: '10px' }} aria-label="directions" title='Delete Task'>
                                            <DeleteOutlineOutlinedIcon />
                                        </IconButton>
                                    </Paper>
                                )
                            })}
                                <br/>
                            </>
                            :
                            <Typography variant={"h4"} textAlign={"center"} mb={10}>No Checklist</Typography>
                    }



                <form action="" className='form-wrapper' onSubmit={submitCheckListData}>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <TextField className='form-input' id="outlined-basic" value={checkListTitle} label="Add Task" variant="outlined" onChange={e => setCheckListTitle(e.target.value)} />
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

export default CheckListModal