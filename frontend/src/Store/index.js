import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./Reducers/Auth-Reducer";
import tabReducer from "./Reducers/Tab-Reducer";
import rootReducer from "./Reducers/Root-Reducer";

export const store = configureStore({reducer: rootReducer})
