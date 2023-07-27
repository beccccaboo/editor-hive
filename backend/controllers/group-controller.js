import { response } from "express"
import Group from "../models/Group.js"

export const createGroup = async(req,res) => {
    console.log(req.body)
    const data = await Group.create(req.body)
    console.log(data)
    res.status(200).send(data)
}

export const getAllGroups = async(req,res) => {
    const data = await Group.find({})
    return data
}