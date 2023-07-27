import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    admin: 
        { 
            type : ObjectId, 
            ref: 'User' 
        },
    members : [{ type : ObjectId, ref: 'User' }],
    link: {
        type : String
    }
   
}, {versionKey: false})

const model = mongoose.model("Group", groupSchema)
export default model;