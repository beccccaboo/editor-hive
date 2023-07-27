import mongoose, {Schema} from "mongoose";

const documentSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    createdBy:{
        type: String
    },
    title: {
        type: String
    },
    data: {
        type: Object,
        required: true
    },
    editAccess:{
        type: String,
        default:"View"
    },
    docType:{
        type:String,
        default:"Private"
    },
    activeMember:[
        String
    ]
    
}, { timestamps: true })

const Document = mongoose.model("document", documentSchema)

export default Document