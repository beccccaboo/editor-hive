import Checklist from "../models/Checklist.js";

//used for post request to save new to-do
export const save = async (checklist) =>{  //Make it async because it will return a promise
    const newChecklist = new Checklist(checklist)
    console.log("In save service: "+newChecklist)
    return newChecklist.save() //By default returns a promise
}

//used for get request to display all to-do items
export const search = async () =>{  //query is a plain JSON object
    const checklists = Checklist.find({})
    return checklists
}

//used for get request to find particular id object
export const find = async (id) =>{
    const checklists = Checklist.find({documetId:id})
    console.log(checklists)
    return checklists
}

//for delete request to delete to-do
export const remove = async (id) =>{
    const removedChecklist = Checklist.findByIdAndDelete(id)
    return removedChecklist
}

// to update status of task
export const updateStatus = async(id) => {
    console.log("CheckList Id",id)
    const existingchecklist = await Checklist.findById(id)
    console.log("Existing CHeck List:- ",existingchecklist.completed)
    const updatedCheckList = Checklist.findByIdAndUpdate(id, {$set:{completed:!existingchecklist.completed} },{$new:true})
    console.log("Updated ChecjList:- ",updatedCheckList)
    return updatedCheckList
}