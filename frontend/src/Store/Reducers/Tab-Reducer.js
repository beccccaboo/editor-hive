import {tab} from "./../State"

const tabReducer = (state = tab, action) => {
    const type = action.type
    const tabValue = action.tabValue
    let newValue
    switch(type){
        case "UPDATE_TABVALUE":
            newValue = {...state, value: tabValue}
            break
        default:
            newValue = {...state}
    }
    return Object.assign({}, newValue)
}

export default tabReducer