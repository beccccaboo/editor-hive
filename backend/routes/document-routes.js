// fetching all the required packages
import express from 'express';
var router = express.Router();
import {
    getAllDocuments,
    deleteDocument,
    updateDocumentAccess,
    getSpecificDocument,
    shareDocument,
    getPrivateDocuments,
    getTeamDocuments,
    removeGroupMember,
    addMemberToGroup,
    deleteTeamDoc,
    addActiveMember,
    deleteActiveMember
} from "../controllers/document-controller.js"

router.route("/getprivdocuments")
    .post(getPrivateDocuments)

router.route("/deleteTeamDocument/:id")
    .delete(deleteTeamDoc)

router.route("/activemember/:id")
    .put(addActiveMember)
    .delete(deleteActiveMember)

router.route("/getteamdocuments")
    .post(getTeamDocuments)

router.route("/getalldocuments")
    .get(getAllDocuments)

router.route("/groupMember/:id")
    .delete(removeGroupMember)
    .put(addMemberToGroup)

router.route("/:id")
    .get(getSpecificDocument)
    .delete(deleteDocument)
    .put(updateDocumentAccess)

router.route("/shared/:id")
    .post(shareDocument)

//exporting router to use in the main index file
export default router