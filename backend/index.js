import app from "./services/app.js"
import { Server } from "socket.io";
import { getDocument,updateDocument } from "./controllers/document-controller.js";
import dotenv from "dotenv";
dotenv.config()
const APPPORT = process.env.PORT || 8081


const IOPORT = 8080
//const APPPORT = 8081

const io = new Server(IOPORT,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection",socket => {
    socket.on('get-document',async (documentId,docTitle,docCreatedBy,documentMembers,documentGroupTitle,docGroupName)=>{
        
        const document = await getDocument(documentId,docTitle,docCreatedBy,documentMembers,documentGroupTitle,docGroupName)

        socket.join(documentId)
        socket.emit("load-document",document.data)


        socket.on("send-changes",delta => {
            console.log(delta)
            // broadcast changes to all the users 
            socket.broadcast.to(documentId).emit("receive-changes",delta)
        })

        socket.on("save-document",async data => {
            await updateDocument(documentId,data)
        })
    })
   
})

app.listen(APPPORT,()=>console.log("Server running"))