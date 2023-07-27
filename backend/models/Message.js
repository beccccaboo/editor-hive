import mongoose, {Schema} from "mongoose";

const MessageSchema = mongoose.Schema({
    docId:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    
    message:{
        type:String,
        required:true
    }
    
}, { timestamps: true })

const Message = mongoose.model("message", MessageSchema)

export default Message