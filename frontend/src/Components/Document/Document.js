import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { DeleteOutline, EditOutlined, IosShareOutlined, PostAddOutlined } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import ShareModal from '../shareModal/ShareModal';
import CheckListModal from '../checkListModal/CheckListModal';
import DocImg from "../../Images/penCrop.jpg"
import {CardActionArea, CardActions, Grid} from "@mui/material";
import { useEffect } from 'react';
import MemberConfigurationModal from '../memberConfigurationModal/MemberConfigurationModal';


let docCreatedBy = "";
let docAccess = "";

export const setUserDocumentCreatedBy = (createdBy) => {
  docCreatedBy = createdBy
  return
}

export const setDocumentAccess = (access) => {
  docAccess = access
  return
}

export const getDocumentCreatedBy = () => docCreatedBy

export const getDocumentAccess = () => docAccess

const Document = ({ data, filterDocumentList }) => {
  
  const navigate = useNavigate();
  const [classHidden, setclassHidden] = React.useState(false)
  const [shareModal, setShareModal] = React.useState(false)
  const [checkListModalDisplay, setCheckListModalDisplay] = React.useState(false)
  const [memberConfigModal, setMemberConfigModal] = React.useState(false)
  const [teamDocFunc, setTeamDocFunc] = React.useState([])
  const auth = useSelector(state => state.user)
  
  const deleteDocument = async (id) => {
    
    setclassHidden(true)
    await fetch(`http://localhost:8081/doc/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    filterDocumentList(1,id)
    

  }

  const deleteTeamDocument = async (id) => {
  
    await fetch(`http://localhost:8081/doc/deleteTeamDocument/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    setclassHidden(true)

    filterDocumentList(2,id)

    
  }

  const shareModalToggle = () => {
    setShareModal(!shareModal)
  }

  const openEditAndSetDocDetails = () => {
  console.log(data)
    setUserDocumentCreatedBy(data.createdBy)
    setDocumentAccess(data.editAccess)
    console.log("Doc created by:- ", data.createdBy)
    navigate(`/docs/${data._id}`)
  }

  const checkListModalToggle = () => {
    setCheckListModalDisplay(!checkListModalDisplay)
  }

  const memberConfigModalToggle = () => {
    setMemberConfigModal(!memberConfigModal)
  }

  return (
      <Grid item xs={5} md={3} lg={3} margin={2} padding={0} >
      {
        classHidden ?
          null
          :
                // <Grid item xs={3}>
                  <Card sx={{ maxWidth: 350}}>
                    <CardActionArea>
                      <CardMedia
                          component="img"
                          height="auto"
                          // image="https://www.aivanet.com/wp-content/uploads/2021/02/1612893614_4891757847937.jpg"
                          image={DocImg}
                          alt="Doc Cover"
                          onClick={openEditAndSetDocDetails}
                      />
                      <CardContent onClick={openEditAndSetDocDetails}>
                        <Typography gutterBottom variant="h5" component="div">
                          {data.title ? data.title : data.documentTitle}
                        </Typography>
                        {
                          data.groupTitle ?
                              <Typography component="div" variant="p">
                                Group: {data.groupTitle}
                              </Typography>
                              :
                              null
                        }
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                          Created At : {data.createdAt}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                          Last Modified : {data.updatedAt}
                        </Typography>
                      </CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        {
                          data.groupTitle ?
                            data.createdBy == auth.email ?
                              <IconButton onClick={() => deleteTeamDocument(data._id)} title="Delete Document" aria-label="delete">
                                <DeleteOutline />
                              </IconButton>
                              :
                              null
                            :
                            <IconButton onClick={() => deleteDocument(data._id)} title="Delete Document" aria-label="delete">
                              <DeleteOutline />
                            </IconButton>
                        }
                        <IconButton onClick={openEditAndSetDocDetails} title="Edit Document" aria-label="edit">
                          <EditOutlined />
                        </IconButton>
                        
                        {
                          !data.groupTitle ?
                            <IconButton aria-label="share" title="Share Document" onClick={shareModalToggle}>
                              <IosShareOutlined />
                            </IconButton>
                            :
                            null
                        }
                        <IconButton aria-label="checklist" title="Check list" onClick={checkListModalToggle}>
                          <PostAddOutlined />
                        </IconButton>
                        {
                          data.groupTitle ?
                            <IconButton aria-label="share" title="Member Settings" onClick={memberConfigModalToggle}>
                              <ManageAccountsOutlinedIcon />
                            </IconButton>
                            :
                            null
                        }
                      </Box>
                    </CardActionArea>
                  </Card>
              // </Grid>

      }

      {
        shareModal ?
          <ShareModal shareModalToggleFunction={shareModalToggle} docCreatedBy={data.createdBy} docId={data._id} sharingDocumentLink={`http://localhost:3000/docs/${data._id}`} />
          :
          null
      }

      {
        checkListModalDisplay ?
          <CheckListModal documentId={data._id} modalToggleFunction={checkListModalToggle} />
          :
          null
      }
      {
        memberConfigModal ?
          <MemberConfigurationModal data={data} modalToggleFunction={memberConfigModalToggle} />
          :
          null
      }

    </Grid>
  )
}

export default Document
