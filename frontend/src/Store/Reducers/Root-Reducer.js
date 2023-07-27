import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "./Auth-Reducer";
import tabReducer from "./Tab-Reducer";

const rootReducer = combineReducers({user: authReducer, tab: tabReducer})

export default rootReducer
