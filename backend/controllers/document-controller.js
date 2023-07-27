import { response } from "express"
import Document from "../models/Document.js"
import User from "../models/User.js";
import Checklist from "../models/Checklist.js";
import Group from "../models/Group.js"
import {sendEmail} from "../utils/sendEmail.js";

export const getDocument = async (id, title, createdBy, documentMembers, documentTitle, groupName) => {
    if (id == null) return

    if (groupName) {

        const document = await Document.findById(id)
        if (document) {
            console.log("Existing doc", document)
            return document
        }
        const membersDoc = documentMembers.map(member => member.emailId)
        console.log("creating goup")

        for (const member of membersDoc) {
            await sendEmail(member, "You have been added to a Group!", `<span><h1>You have been added to a group!</h1><br><span>${createdBy} has added you to a group - <h2>${groupName}</h2></span><br>The document name is <h3>${documentTitle}</h3></span>`)
            console.log("Email Sent")
        }
        const data = await Document.create({_id:id,createdBy:createdBy,title:documentTitle,data:"",docType:"Group"})
        return await Group.create({_id:data._id,createdBy:createdBy,groupTitle:groupName,documentTitle:documentTitle,members:membersDoc})
        
    }else{
        console.log("creating project priv")
        const document = await Document.findById(id)
        if (document) return document
        return await Document.create({ _id: id, createdBy: createdBy, title: title, data: "" })
    }
}

export const getSpecificDocument = async (req, resp) => {
    console.log("me called")
    const data = await Document.findById(req.params.id)
    console.log(data)
    resp.status(200).send(data)
}

export const getAllDocuments = async (req, response) => {
    const data = await Document.find({})
    console.log(data)
    response.status(200).send(data)
}

export const updateDocument = async (id, data) => {
    return await Document.findByIdAndUpdate(id, { data })
}

export const updateDocumentAccess = async (req, res) => {
    console.log("update document access called", req.body.editAccess)
    console.log(req.body)
    const data = await Document.findByIdAndUpdate(req.params.id, { $set: { editAccess: req.body.editAccess } }, { new: true })
    res.status(200).send(data)
}

export const deleteDocument = async (req, response) => {
    return await Document.findByIdAndDelete(req.params.id)
}
export const shareDocument = async (req, res) => {
    try {
        const documentId = req.params.id

        const members = req.body.members
        let memberArray = []
        for (const member of members) {
            const memberId = await User.findOne({ email: member })._id
            memberArray.push(memberId)
        }

        const updatedDocument = Document.findByIdAndUpdate(documentId, { $set: { documentType: "Shared", members: memberArray } }, { $new: true })
        setResponse(updatedDocument, res)

    } catch (error) {
        setError(error, res)
    }
}

export const getPrivateDocuments = async (req, res) => {
    const emailId = req.body.email
    const data = await Document.find({ createdBy: emailId })
    res.status(200).send(data)
}

export const getTeamDocuments = async (req, res) => {
    const emailId = req.body.email
    const data = await Group.find({ members: emailId })
    console.log(data)
    res.status(200).send(data)
}

export const removeGroupMember = async (req, res) => {
    const emailId = req.body.email
    const data = await Group.findOneAndUpdate({ _id: req.params.id }, { $pull: { members: emailId } }, { $new: true })
    console.log("User Deleted", data)
    res.status(200).send(data)
}

export const addMemberToGroup = async (req, res) => {
    const emailId = req.body.email
    const createdBy = req.body.createdBy
    const groupName = req.body.groupTitle
    const documentTitle = req.body.documentTitle
    console.log("Email from frontend", emailId, " ", req.params.id)

    await sendEmail(emailId, "You have been added to a Group!", `<span><h1>You have been added to a group!</h1><br><span>${createdBy} has added you to a group - <h2>${groupName}</h2></span><br>The document name is <h3>${documentTitle}</h3></span>`)

    const data = await Group.findOneAndUpdate({ _id: req.params.id }, { $push: { members: emailId } }, { $new: true })
    res.status(200).send(data)
}

export const deleteTeamDoc = async (req, res) => {
    const docIdToDelete = req.params.id
    const data = await Document.findById(docIdToDelete)
    await Group.findByIdAndDelete(docIdToDelete)
    res.status(200).send(data)
}

export const addActiveMember = async (req, res) => {
    console.log("Add active member called", req.params.id)
    const data = await Document.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { activeMember: req.body.email } }, { $new: true })
    res.status(200).send(data)
}

export const deleteActiveMember = async (req, res) => {
    console.log("Remove active member called", req.params.id)
    const data = await Document.findOneAndUpdate({ _id: req.params.id }, { $pull: { activeMember: req.body.email } }, { $new: true })
    res.status(200).send(data)
}