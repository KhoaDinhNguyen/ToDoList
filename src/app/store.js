import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { projectsSlice, tasksSlice, profileNameSlice } from "../features/user/databaseSlice";
import { filterSlice, sortSlice, searchSlice } from "../features/user/utility";

const reducers = {
    [projectsSlice.name] : projectsSlice.reducer,
    [tasksSlice.name] : tasksSlice.reducer,
    [profileNameSlice.name] : profileNameSlice.reducer,
    
    [filterSlice.name] : filterSlice.reducer,
    [sortSlice.name] : sortSlice.reducer,
    [searchSlice.name] : searchSlice.reducer,
}

const rootReducer = combineReducers(reducers);

const store = configureStore({reducer:rootReducer});

export default store;
