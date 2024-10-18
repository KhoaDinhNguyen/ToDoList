import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userNameLoginSlice, passwordLoginSlice } from "../features/signIn/signInSlice";
import { projectsSlice, tasksSlice } from "../features/fetchingData/databaseDataSlice";
import { fullNameSlice } from "../features/fetchingData/userDataSlice";

const reducers = {
    [userNameLoginSlice.name] : userNameLoginSlice.reducer,
    [passwordLoginSlice.name] : passwordLoginSlice.reducer,
    [projectsSlice.name] : projectsSlice.reducer,
    [tasksSlice.name] : tasksSlice.reducer,
    [fullNameSlice.name]: fullNameSlice.reducer
}

const rootReducer = combineReducers(reducers);

const store = configureStore({reducer:rootReducer});

export default store;
