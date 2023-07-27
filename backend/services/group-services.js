import Group from "../models/Group.js";

//used for post request to save new to-do
export const save = async (group) =>{  //Make it async because it will return a promise
    const newGroup = new Group(group)
    console.log("In group save service: "+newGroup)
    return newGroup.save() //By default returns a promise
}