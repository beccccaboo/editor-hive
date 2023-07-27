import mongoose, {Schema} from "mongoose";

const groupSchema = mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    createdBy:{
        type: String,
        required:true
    },
    groupTitle: {
        type: String,
        required:true
    },
    documentTitle:{
        type:String,
        required:true
    },
    members : [{ type : String }]
    
}, { timestamps: true })

const Group = mongoose.model("group", groupSchema)

export default Group