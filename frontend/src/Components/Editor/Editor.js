import React, { useEffect, useState } from 'react'
import "./Editor.scss"
import {Box, Divider, Typography} from "@mui/material"
import Quill from "quill"
import 'quill/dist/quill.snow.css'
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import { getDocumentTitle } from '../modal/Modal'
import { getDocumentGroupTitle, getMembersList, getDocumentGroupName } from "../group/Group.js"
import { useSelector } from "react-redux";
import Document, { getDocumentCreatedBy, getDocumentAccess } from '../Document/Document'
import { IosShareOutlined, PostAddOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import ShareModal from "../shareModal/ShareModal.js";
import CheckListModal from "../checkListModal/CheckListModal.js";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ChatIcon from '@mui/icons-material/Chat';
import ChatModal from "../chatModal/ChatModal";

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

const Editor = () => {
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()
  const [fetchedDocument, setFetchedDocument] = useState({title: "",
    updatedAt: "", createdBy: ""})
  const [shareModal, setShareModal] = React.useState(false)
  const [chatModal, setChatModal] = React.useState(false)
  const [activeMembers, setActiveMembers] = React.useState([])
  const [checkListModalDisplay, setCheckListModalDisplay] = React.useState(false)
  const { id } = useParams()
  const auth = useSelector(state => state.user)
  let currDoc = {}

  window.onpopstate = async () => {
    const response = await fetch(`http://localhost:8081/doc/activemember/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: auth.email
      })
    })
    const data = await response.json()
    const filtered = data.filter(i => i.email !== data.email)
    console.log("Data after adding active member", filtered.json())

  }

  const addActiveUser = async () => {
    console.log("adding active member")
    const response = await fetch(`http://localhost:8081/doc/activemember/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: auth.email
      })
    })
    const data = await response.json()
    setActiveMembers(data.activeMember)
    console.log("Data after adding active member", data)
  }

 
  

  useEffect(() => {
    const createdByUser = getDocumentCreatedBy()
    const createdDocAccess = getDocumentAccess()
    console.log("****", createdByUser, auth.email)
    addActiveUser()
    const quillServer = new Quill('#container', { theme: 'snow', modules: { toolbar: toolbarOptions } })


    quillServer.disable()
    quillServer.setText("Loading Contents....")
    setQuill(quillServer)

    async function getDoc(){
      return await fetch(`http://localhost:8081/doc/${id}`,{
        method: "GET"
      })}
    getDoc().then(res => {
      return res.json().then(res => {
        // if(res.ok) {
        console.log(res.title)
        const dateTime = new Date(res.updatedAt).toString().substring(0, 21)
        return setFetchedDocument({...fetchedDocument, title: res.title, updatedAt: dateTime, createdBy: res.createdBy})
        // }
      })
    })

  }, [])

  useEffect(() => {
    addActiveUser()
    const socketServer = io("http://localhost:8080")
    setSocket(socketServer)

    // on component will unmount
    return () => {
      socketServer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket == null || quill == null) return
    //delta keeps a record of all the changes and detect changes
    const handleChange = (delta, oldDelta, source) => {
      if (source !== 'user') return

      socket && socket.emit("send-changes", delta)
    }

    quill && quill.on('text-change', handleChange);

    return () => {
      quill && quill.off('text-change', handleChange)
    }
  }, [quill, socket])

  useEffect(() => {
    if (socket == null || quill == null) return
    //delta keeps a record of all the changes and detect changes
    const handleChange = (delta) => {
      quill.updateContents(delta)
    }

    socket && socket.on('receive-changes', handleChange);

    return () => {
      socket && socket.off('receive-changes', handleChange)
    }
  }, [quill, socket])

  useEffect(() => {
    const documentTitle = getDocumentTitle()
    console.log("*******", documentTitle)
    const documentMembers = getMembersList()
    const documentGroupTitle = getDocumentGroupTitle()
    const docGroupName = getDocumentGroupName()
    if(!documentTitle)
      setFetchedDocument({...fetchedDocument, title: documentGroupTitle, updatedAt: "Now"})
    else setFetchedDocument({...fetchedDocument, title: documentTitle, updatedAt: "Now"})
    console.log(auth.email)
    if (quill == null || socket == null) return
    socket.once("load-document", document => {

      quill && quill.setContents(document)
      quill && quill.enable()
    })

    socket && socket.emit("get-document", id, documentTitle, auth.email,documentMembers,documentGroupTitle,docGroupName)

  }, [quill, socket, id])

  useEffect(() => {
    if (socket == null || quill == null) return

    const interval = setInterval(() => {
      socket && socket.emit("save-document", quill.getContents())
    }, 2000);

    return () => {
      clearInterval(interval)
    }

  }, [socket, quill])

  const boxStyle = {
    borderRadius: 1.5,
    padding: 1,
    margin: "20px auto",
    width: "70%",
    boxShadow: 3,
    border: "1px"
  }

  const activeUserStyle = {
    borderRadius : 1.5,
    padding : 1.5,
    margin: "100px auto",
    width: "80%",
    boxShadow: 3,
    border: "1px"
  }

  const shareModalToggle = () => {
    setShareModal(!shareModal)
  }

  const checkListModalToggle = () => {
    setCheckListModalDisplay(!checkListModalDisplay)
  }

  const chatModalToggle = () => {
    setChatModal(!chatModal)
  }

  return (
      <>
      {/*<Box className='toolbar'>*/}
      {/*  <Box className='toolbar-editor' id='container'>*/}

      {/*  </Box>*/}
      {/*</Box>*/}
        <Box display={"flex"} justifyContent={"center"}>
          <Box display={"flex"} flexDirection={"column"} flex={5}>
            <Box display={"flex"} sx={boxStyle} border={2} borderColor={"#000"} alignItems={"center"}>
                <Typography variant={"h5"} paddingLeft={"10px"}textAlign={"center"}>{fetchedDocument.title}</Typography>
                <Typography fontWeight={"light"} fontStyle={"italic"} variant={"body1"} margin={"auto"} textAlign={"center"}>Last Opened: {fetchedDocument.updatedAt}</Typography>
                <IconButton aria-label="share" marginLeft={"auto"}  title="Share Document" onClick={shareModalToggle}>
                  <IosShareOutlined />
                </IconButton>
                <IconButton aria-label="checklist" marginLeft={"10px"}  title="Check list" onClick={checkListModalToggle}>
                  <PostAddOutlined />
                </IconButton>
              {
                <IconButton aria-label="chat" marginLeft={"10px"} title="Chat" onClick={chatModalToggle}>
                  <ChatIcon/>
                </IconButton>
              }

            </Box>
            <Box className='toolbar'>
              <Box className='toolbar-editor' id='container'>

              </Box>
            </Box>
          </Box>
          <Box flex={1}>
            <Box display={"flex"} flexDirection={"column"} sx={activeUserStyle} alignItems={"center"}>
              <Box display={"flex"} alignItems={"center"} justifyContent={"center"} mb={3}>
              <FiberManualRecordIcon style={{color: "green"}}></FiberManualRecordIcon><Typography variant={"h6"} fontWeight={"bold"}>Active Users</Typography>
              </Box>
              {
                (activeMembers.length>0) ?
                activeMembers.map((member, index)=> {
                  return <><Typography key={index} variant={"body1"} >{member}</Typography><Divider variant={"middle"} component={"body"}/></>
                }) : null
              }
            </Box>
          </Box>
        </Box>
        {
          shareModal ?
              <ShareModal shareModalToggleFunction={shareModalToggle} docCreatedBy={fetchedDocument.createdBy} docId={id} sharingDocumentLink={`http://localhost:3000/docs/${id}`} />
              :
              null
        }

        {
          checkListModalDisplay ?
              <CheckListModal documentId={id} modalToggleFunction={checkListModalToggle} />
              :
              null
        }

        {
          chatModal ?
              <ChatModal documentId={id} sender={auth.email} chatModalToggleFunction={chatModalToggle} />
              :
              null
        }
        </>
  )
}

export default Editor