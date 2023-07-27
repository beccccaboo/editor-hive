import mongoose from "mongoose";
// title, description, createdDate, & lastModifiedDate
const  schema = new mongoose.Schema({
    title: {
        type: String,
        required: 'The title field is required.'
    },
    documetId:{
        type:String,
        required:"Document Id is required"
    },
    completed: {
        type: Boolean,
        default: false
    }
},{timestamps:true}, {versionKey: false})

const model = mongoose.model("checklist", schema)
export default model;