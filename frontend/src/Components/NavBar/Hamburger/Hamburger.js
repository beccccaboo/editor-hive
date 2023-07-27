import React, {useState} from "react"
import {Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu"
import {useNavigate} from "react-router-dom";
import {signOutAction} from "../../../Store/Actions/Auth";
import {useDispatch, useSelector} from "react-redux";
import {updateTabValue} from "../../../Store/Actions/Tab";
import Modal from "../../modal/Modal";
import Group from "../../group/Group";

const pages = ["Login", "Sign Up", "Sign Out", "Team Documents", "Private Documents"]
let filteredPages = pages
const Hamburger = () => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const auth = useSelector(state => state.user)
    const tab = useSelector(state => state.tab)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [taskModal, setTaskModal] = useState(false)
    const [groupModal, setGroupModal] = useState(false)

    const toggleModal = () => {
        setTaskModal(!taskModal)
    }

    const toggleGroupModal = () => {
        console.log("Called")
        setGroupModal(!groupModal)
    }
    const handleNavigate = (page) => {
        if(page === "Login")
            navigate("/login")
        else if(page === "Sign Up")
            navigate("/registration")
        else if(page === "Sign Out"){
            dispatch(signOutAction())
            navigate("/")
        } else if(page==="Team Documents" || page==="Private Documents"){
            navigate("/home")
            if(page==="Private Documents")
                dispatch(updateTabValue("three"))
            else if(page==="Team Documents")
                dispatch(updateTabValue("two"))
            else
                dispatch(updateTabValue("one"))
        }
    }

    if(auth.email){
        filteredPages = pages.filter(page => (page!=="Login" && page!=="Sign Up"))
    } else {
        filteredPages = pages.filter(page => (page==="Login" ||page==="Sign Up"))
    }

    return(
        <>
            <Drawer open={openDrawer}
            onClose={()=> setOpenDrawer(false)}>
                <List>
                    {filteredPages.map((page, index) => (
                            <ListItemButton onClick={()=> setOpenDrawer(false)} key={index}>
                                <ListItemIcon>
                                    <ListItemText onClick={() => handleNavigate(page)}>{page}</ListItemText>
                                </ListItemIcon>
                            </ListItemButton>
                        ))}
                    {!auth.email ? <></> : <>
                        <ListItemButton onClick={()=> setOpenDrawer(false)}>
                            <ListItemIcon>
                                <ListItemText onClick={toggleModal}>Create Document</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton onClick={()=> setOpenDrawer(false)}>
                            <ListItemIcon>
                                <ListItemText onClick={toggleGroupModal}>Create Group</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        </>
                    }
                </List>
            </Drawer>
            <IconButton sx={{color: "#e0e8f8", marginLeft:"auto"}} onClick={()=> setOpenDrawer(!openDrawer)}><MenuIcon></MenuIcon></IconButton>
            <Box>
                {taskModal ? <Modal toggleModalFunction={toggleModal} /> : null}
            </Box>

            <Box>
                {groupModal ? <Group toggleModalFunction={toggleGroupModal} />:null}
            </Box>
        </>
    )
}

export default Hamburger