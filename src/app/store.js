import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userNameLoginSlice, passwordLoginSlice } from "../features/signIn/signInSlice";
import { projectsSlice, tasksSlice } from "../features/fetchingData/databaseDataSlice";
import { fullNameSlice } from "../features/fetchingData/userDataSlice";
import { userNameSignUpSlice, fullNameSignUpSlice, passwordSignUpSlice, correctPasswordSignUpSlice } from "../features/signIn/signUpSlice";
import { newProjectName, newProjectDescription } from "../features/createProject/projectInfoSlice";

const reducers = {
    [userNameLoginSlice.name] : userNameLoginSlice.reducer,
    [passwordLoginSlice.name] : passwordLoginSlice.reducer,
    [projectsSlice.name] : projectsSlice.reducer,
    [tasksSlice.name] : tasksSlice.reducer,
    [fullNameSlice.name]: fullNameSlice.reducer,
    // Sign Up Slice
    [userNameSignUpSlice.name] : userNameSignUpSlice.reducer,
    [fullNameSignUpSlice.name] : fullNameSignUpSlice.reducer,
    [passwordSignUpSlice.name] : passwordSignUpSlice.reducer,
    [correctPasswordSignUpSlice.name] : correctPasswordSignUpSlice.reducer,

    //Create new project
    [newProjectName.name] : newProjectName.reducer,
    [newProjectDescription.name] : newProjectDescription.reducer
}

const rootReducer = combineReducers(reducers);

const store = configureStore({reducer:rootReducer});

export default store;
