import { createSlice } from "@reduxjs/toolkit";

const userNameSignUpSlice = createSlice({
    name: "usernameSignUp",
    initialState: "",
    reducers: {
        add (state, action) {
            state = action.payload;
            return state;
        },
        delete(state) {
            state = "";
            return state;
        }
    }
});

const fullNameSignUpSlice = createSlice({
    name: "fullnameSignUp",
    initialState: "",
    reducers: {
        add (state, action) {
            state = action.payload;
            return state;
        },
        delete(state) {
            state = "";
            return state;
        }
    }
});

const passwordSignUpSlice = createSlice({
    name: "passwordSignUp",
    initialState: "",
    reducers: {
        add (state, action) {
            state = action.payload;
            return state;
        },
        delete(state) {
            state = "";
            return state;
        }
    }
});

const correctPasswordSignUpSlice = createSlice({
    name: "correctPasswordSignUp",
    initialState: "",
    reducers: {
        add (state, action) {
            state = action.payload;
            return state;
        },
        delete(state) {
            state = "";
            return state;
        }
    }
});

export {userNameSignUpSlice, fullNameSignUpSlice, passwordSignUpSlice, correctPasswordSignUpSlice}