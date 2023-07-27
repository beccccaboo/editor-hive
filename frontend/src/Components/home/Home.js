import React, { useEffect, useState } from 'react'
import {Box, Tabs, Tab, Button, Grid} from '@mui/material';
import "./Home.scss"
import Document from '../Document/Document';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

import Modal from "../modal/Modal"
import Group from '../group/Group';
import { useSelector } from "react-redux";
import Footer from "../Footer/Footer";

const Home = () => {
    // const [tabValue, setTabValue] = React.useState('one');
    const [fetchedDocuments, setFetchedDocuments] = useState([])
    const [privateDocuments, setprivateDocuments] = useState([])
    const [teamDocuments, setTeamDocuments] = useState([])
    const [taskModal, setTaskModal] = useState(false)
    const [groupModal, setGroupModal] = useState(false)

    const auth = useSelector(state => state.user)

    const tab = useSelector(state => state.tab)
    console.log(JSON.stringify(tab))

    useEffect(() => {
        getDocumentList()
    }, [auth])

    const filterDocumentList = (no,id) => {
        console.log("***",no,id)
        if(no==1){
            privateDocuments = privateDocuments.filter(doc => doc._id !== id)
        }else{
            teamDocuments = teamDocuments.filter(doc => doc._id !== id)
        }
    }

    const getDocumentList = async () => {
    
            const presponse = await fetch('http://localhost:8081/doc/getprivdocuments', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: auth.email
                })
            })

            const pdocuments = await presponse.json();
            setprivateDocuments(pdocuments)
        

        if(pdocuments){
            const tresponse = await fetch('http://localhost:8081/doc/getteamdocuments', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: auth.email
            })
        })

        const tdocuments = await tresponse.json();
        setTeamDocuments(tdocuments)
        
        }
    }

    const toggleModal = () => {
        setTaskModal(!taskModal)
    }

    const toggleGroupodal = () => {
        setGroupModal(!groupModal)
    }
   
    return (

        <>
            <>
                {(() => {
                    
                     if (tab.value === "two") {

                        return (
                            <Grid container spacing={1.5} alignItems={"flex-start"} justifyContent={"center"}>
                                {
                                    teamDocuments.map((doc, index) => {
                                        return (

                                            <Document key={index} data={doc} />
                                        )
                                    })
                                }
                            </Grid>
                        )
                    } else if (tab.value === "three"){
                        return (
                            <Grid container spacing={1.5} alignItems={"flex-start"} justifyContent={"center"}>
                                {
                                    privateDocuments.map(
                                        (doc, index) => {
                                            if(doc.docType == "Private"){
                                                return (
                                                    <Document key={index} data={doc} filterDocumentList={filterDocumentList} />
                                                )
                                            }
                                        }
                                    )
                                }

                            </Grid>

                        )
                    }
                })()}
            </>
            <Box>
                {
                    taskModal ?
                        <Modal toggleModalFunction={toggleModal} />
                        :
                        null
                }
            </Box>

            <Box>
                {
                    groupModal ?
                        <Group toggleModalFunction={toggleGroupodal} />
                        :
                        null
                }
            </Box>
            <Footer></Footer>
        </>
    )
}

export default Home