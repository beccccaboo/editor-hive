export const setResponse = (obj, response)=>{
    response.status(200).send(obj)
    // response.json(obj)

}

export const setError = (err, status, response) => {
    response.status(status).send({"message": err})
    // response.json(err)

}
