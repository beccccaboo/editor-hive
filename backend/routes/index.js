
import AuthRouter from "./auth-routes.js";
import DocRouter from "./document-routes.js";
import ChecklistsRouter from "./checklist-routes.js";
import GroupRouter from "./group-routes.js";
import MailRouter from "./mail-routes.js";
import MessageRouter from "./message-routes.js"
console.log("Routes Called")

// add auth and later on inside all th fetch statements add the header token / bearer token 
// token name: x-auth-token ( verify from auth .js ())  

export default (app) => {
    app.use("/", AuthRouter),
    app.use("/doc",DocRouter)
    app.use("/checklist", ChecklistsRouter)
    app.use("/group",GroupRouter)
    app.use("/mail",MailRouter)
    app.use("/message", MessageRouter)
}
