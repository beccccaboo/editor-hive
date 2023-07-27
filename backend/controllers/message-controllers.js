import Message from "../models/Message.js"

export const addMessage = async(req,res) => {
    console.log("add message function called")
    console.log(req.body.email,req.body.docId,req.body.message)
    const data = await Message.create({docId:req.body.docId,from:req.body.from,message:req.body.message})
    res.status(200).send(data)
}

export const delMessage = async(req,res) => {
    console.log("Delete Message Called") 
    const data = await Message.deleteMany({docId:req.body.docId})
    res.status(200).send(data)
}

export const getMessages = async (req,res) => {
    console.log("Get Messages")
    const data = await Message.find({docId: req.params.id})
    console.log(data)
    res.status(200).send(data)
}