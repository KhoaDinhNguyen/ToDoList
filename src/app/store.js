import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = {

}

const rootReducer = combineReducers(reducers);

const store = configureStore({reducer:rootReducer});

export default store;
