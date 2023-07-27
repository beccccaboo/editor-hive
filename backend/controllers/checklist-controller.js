import * as checklistService from "./../services/checklist-service.js";
import {setError, setResponse} from "./index.js";

//Search for all todos (get request)
export const index = async (req, res) => {
    try{
        const checklist = await checklistService.search()
        setResponse(checklist, res)
    } catch (error) {
        setError(error, 400, res)
    }
}

//search a particular to-do object
export const get = async (req, res) => {   //Search by id
    try{
        const id = req.params.id
        console.log("id",id)
        const checklist = await checklistService.find(id)
        setResponse(checklist, res)
    } catch (error) {
        setError(error, 400, res)
    }
}

//express app invokes the function to create new to-do
export const post = async (req, res) => {
    try{
        const checklist = req.body
        console.log(checklist)
        const savedChecklist = await checklistService.save(checklist)
        console.log("Returned value after saving using services:- ",savedChecklist)
        setResponse(savedChecklist, res)
    } catch (error) {
        setError(error, 400, res)
    }

}

//patch request to update only part of the to-do object
export const patch = async (req, res) => {
    try{
        const id = req.params.id
        const checklist = req.body
        const updatedChecklist = await checklistService.update(id, checklist)
        setResponse(updatedChecklist, res)

    } catch(error) {
        setError(error, 400, res)
    }
}

//Delete request to remove a particular to-do
export const remove = async (req, res) => {
    try{
        const id = req.params.id
        const removedChecklist = await checklistService.remove(id)
        setResponse(removedChecklist, res)
    } catch(error) {
        setError(error, 400, res)
    }
}

//toggle task status
export const updateStatus = async (req,res) => {
    console.log("here")
    try{
        const id = req.params.id
        const updatedCheckList = await checklistService.updateStatus(id)
        setResponse(updatedCheckList,res)
    }catch(error){
        setError(error, 400, res)
    }
}
