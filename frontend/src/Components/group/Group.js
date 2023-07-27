import React, { useState } from 'react'
import "./Group.scss"
import {Box, Button, TextField, Typography} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

import Modal from '@mui/material/Modal';

import {useDispatch, useSelector} from "react-redux";

import CreatableSelect from 'react-select/creatable'
let titleDocument = ""
let docGroupTitle = ""
let membersListArray = []


export const setUserDocumentTitle = (title) => {
    titleDocument = title
    return
}

export const setDocumentMembers = (membersList) => {
    membersListArray = membersList
    return
}

export const setDocumentGroupTitle = (groupTitle) => {
    docGroupTitle = groupTitle
    return
}

export const getDocumentGroupTitle = () => titleDocument

export const getMembersList = () => membersListArray

export const getDocumentGroupName = () => docGroupTitle

const Group = ({ toggleModalFunction }) => {
    const navigate = useNavigate()
    const [documentTitle, setDocumentTitle] = useState('')

    const [inputValue, setInputValue] = useState('');
    const [groupName, setgroupName] = useState('')
    const [selectedValues, setselectedValues] = useState({ selected: [] });
    const [open, setOpen] = useState(true);
    const [selection, setSelection] = useState([]);

    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const auth = useSelector(state => state.user)

    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            width: state.selectProps.width,
            // borderBottom: '1px dotted pink',
            // color: state.selectProps.menuColor,
            padding: 10,
            display: 'none',
            backgroundColor: 'rgba(100,100,50,0.8)'
        }),

        // control: (_, { selectProps: { width } }) => ({
        //     width: width
        // })
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

    const components = {
        DropdownIndicator: null,
    };

    const setDocumentDetails = () => {
        setUserDocumentTitle(documentTitle)
        setDocumentMembers([...selection,{"emailId":auth.email}])
        setDocumentGroupTitle(groupName)
        toggleModalFunction()
        navigate('/new')
        
    }

    const handleOnChange = () => {
        const newOption = { emailId: inputValue };

        inputValue !== '' && setSelection([...selection, newOption]);

        setInputValue('');

        setselectedValues(selection);
    };



    const handleUserInput = (e, emailId) => {
        if (e.keyCode === 13) {
            setSelection([...selection, emailId])

        }
        console.log("Selection:- ",selection)
    }

    return (
        <div>
            <Modal open={open}
                   onClose={toggleModalFunction}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Box display={"flex"} flexDirection={"column"}>
                        <Typography variant={"h4"} padding={3} textAlign={"center"}>New Shared Document</Typography>
                        <TextField label={"Title"} variant={"outlined"} type={"text"} placeholder={'Title'} value={documentTitle} onChange={(e) => setDocumentTitle(e.target.value)} required ></TextField><br/>
                        <TextField label={"Group Name"} variant={"outlined"} type={"text"} placeholder={'Group Name'} value={groupName} onChange={(e) => setgroupName(e.target.value)} required ></TextField><br/>

                        <CreatableSelect
                            components={components}
                            options={selection}
                            isMulti
                            styles={customStyles}
                            onChange={handleOnChange}
                            onInputChange={handleInputChange}
                            inputValue={inputValue}
                            value={selectedValues.selected}
                            controlShouldRenderValue={true}
                            formatCreateLabel={() => undefined}
                            onKeyDown={(e)=>handleUserInput(e,inputValue)}
                            placeholder="Enter Email Ids"
                        />
                        <Button variant="contained" sx={{margin: "20px"}} endIcon={<SendIcon />} onClick={setDocumentDetails }>
                            Create
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default Group