import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { projectsSlice, tasksSlice, profileNameSlice } from "../features/user/databaseSlice";
import { searchSlice, createProjectFormSlice, filterAndSortFormSlice, sortTaskNameSlice, sortTimeCreatedSlice, sortTimeDeadlineSlice, filterImportantSlice, filterStatusSlice, filterTimeCreatedFromSlice, filterTimeCreatedToSlice, filterTimeDeadlineFromSlice, filterTimeDeadlineToSlice} from "../features/user/utility";

const reducers = {
    [projectsSlice.name] : projectsSlice.reducer,
    [tasksSlice.name] : tasksSlice.reducer,
    [profileNameSlice.name] : profileNameSlice.reducer,
    
    [filterStatusSlice.name] : filterStatusSlice.reducer,
    [filterImportantSlice.name] : filterImportantSlice.reducer,
    [filterTimeCreatedFromSlice.name] : filterTimeCreatedFromSlice.reducer,
    [filterTimeCreatedToSlice.name] : filterTimeCreatedToSlice.reducer,
    [filterTimeDeadlineFromSlice.name] : filterTimeDeadlineFromSlice.reducer,
    [filterTimeDeadlineToSlice.name]: filterTimeDeadlineToSlice.reducer,

    [sortTaskNameSlice.name] : sortTaskNameSlice.reducer,
    [sortTimeCreatedSlice.name] : sortTimeCreatedSlice.reducer,
    [sortTimeDeadlineSlice.name] : sortTimeDeadlineSlice.reducer,

    [searchSlice.name] : searchSlice.reducer,
    [createProjectFormSlice.name]: createProjectFormSlice.reducer,
    [filterAndSortFormSlice.name] : filterAndSortFormSlice.reducer
}

const rootReducer = combineReducers(reducers);

const store = configureStore({reducer:rootReducer});

export default store;
