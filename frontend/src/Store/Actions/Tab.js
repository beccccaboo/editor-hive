export const updateTabValue = (tabValue) =>{
    return(dispatch) => {
        dispatch({
            type: "UPDATE_TABVALUE",
            tabValue
        })
    }
}