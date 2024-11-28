import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { projectsSlice, tasksSlice } from "../features/user/databaseSlice";
import { createProjectName, createProjectDescription } from "../features/project/createProjectSlice";
import { newTaskName, newTaskDescription, newTaskDeadline } from "../features/task/createTaskSlice";
import { filterSlice, sortSlice, searchSlice } from "../features/user/utility";

const reducers = {

    [projectsSlice.name] : projectsSlice.reducer,
    [tasksSlice.name] : tasksSlice.reducer,
    
    [filterSlice.name] : filterSlice.reducer,
    [sortSlice.name] : sortSlice.reducer,
    [searchSlice.name] : searchSlice.reducer,

    //Create new projects
    [createProjectName.name] : createProjectName.reducer,
    [createProjectDescription.name] : createProjectDescription.reducer,

    //Create new task
    [newTaskName.name] : newTaskName.reducer,
    [newTaskDescription.name] : newTaskDescription.reducer,
    [newTaskDeadline.name] : newTaskDeadline.reducer

}

const rootReducer = combineReducers(reducers);

const store = configureStore({reducer:rootReducer});

export default store;
