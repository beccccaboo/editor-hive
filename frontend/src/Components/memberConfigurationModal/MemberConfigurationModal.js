import React, { useState, useEffect } from 'react'
import "./MemberConfigurationModal.scss"
import {Button, Divider, IconButton, InputBase, Paper, TextField, Typography} from '@mui/material';
import { DeleteOutline } from "@mui/icons-material"
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import Modal from "@mui/material/Modal";
import SendIcon from "@mui/icons-material/Send";


const MemberConfigurationModal = ({ data, modalToggleFunction }) => {
    const [memberName, setMemberName] = useState("")
    const [documentMembers, setDocumentMembers] = useState(data.members)
    const [open, setOpen] = React.useState(true);

    const removeUserFromGroup = async (ememberName, id) => {
        console.log(ememberName, "is to be deleted",id,"id ")
        const response = await fetch(`http://localhost:8081/doc/groupMember/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:ememberName
            })
        });
        const data = await response.json()
        setDocumentMembers(
            documentMembers.filter(member => member != ememberName)
        )
        console.log(data)
    }

    const addMemberToGroup = async(e) => {
        e.preventDefault()
        console.log("Doc ID",data._id)
        console.log("Add member to a group")
        await fetch(`http://localhost:8081/doc/groupMember/${data._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:memberName,
                createdBy: data.createdBy,
                documentTitle: data.documentTitle,
                groupTitle: data.groupTitle
            })
        })
            .then(res => res.json())
            .then(data => setDocumentMembers(prevState => [...prevState,memberName]))
            .catch(err => console.log(err))

            setMemberName("")
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

    return (
        <div >
            <Modal open={open}
                   onClose={modalToggleFunction}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description">
                {/*<IconButton className='btn-icon' onClick={modalToggleFunction} color="primary" aria-label="upload picture" component="label">*/}
                {/*    X*/}
                {/*</IconButton>*/}
                <Box sx={style} display={"flex"} flexDirection={"column"} gap={1.5}>
                <Box className='checklist-tasks'>
                    {
                        documentMembers.length > 0 ?
                            <>
                            <Typography variant={"h4"} textAlign={"center"} mb={2}>Configure Members</Typography>
                            {documentMembers.map((member) => {
                                return (
                                    <Paper
                                        component="form"
                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            value={member}
                                            inputProps={{ 'aria-label': 'Check List Task' }}
                                        />

                                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                        <IconButton color="primary" sx={{ p: '10px' }} onClick={() => removeUserFromGroup(member,data._id)} aria-label="directions" title='Delete Task'>
                                            <DeleteOutline />
                                        </IconButton>
                                    </Paper>
                                )
                            })}
                                <br/>
                            </>
                            :
                            <Typography variant={"h4"} textAlign={"center"} mb={10}>No Members</Typography>
                    }
                </Box>

                <form action="" className='form-wrapper' onSubmit={addMemberToGroup}>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <TextField className='form-input' id="outlined-basic" value={memberName} label="New Member" variant="outlined" onChange={e => setMemberName(e.target.value)} />
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

export default MemberConfigurationModal