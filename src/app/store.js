import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userNameLoginSlice, passwordLoginSlice } from "../features/signIn/signInSlice";
const reducers = {
    [userNameLoginSlice.name] : userNameLoginSlice.reducer,
    [passwordLoginSlice.name] : passwordLoginSlice.reducer
}

const rootReducer = combineReducers(reducers);

const store = configureStore({reducer:rootReducer});

export default store;
