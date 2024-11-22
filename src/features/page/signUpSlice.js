import { createSlice } from "@reduxjs/toolkit";

const accountNameSignUpSlice = createSlice({
    name: "accountNameSignUp",
    initialState: "",
    reducers: {
        add (state, action) {
            return action.payload;;
        },
        clean(state) {
            return "";
        }
    }
});

const profileNameSignUpSlice = createSlice({
    name: "profileNameSignUp",
    initialState: "",
    reducers: {
        add (state, action) {
            return action.payload;
        },
        clean(state) {
            return "";
        }
    }
});

const passwordSignUpSlice = createSlice({
    name: "passwordSignUp",
    initialState: "",
    reducers: {
        add (state, action) {
            return action.payload;
        },
        clean(state) {
            return "";
        }
    }
});

const correctPasswordSignUpSlice = createSlice({
    name: "correctPasswordSignUp",
    initialState: "",
    reducers: {
        add (state, action) {
            return action.payload;
        },
        clean(state) {
            return "";
        }
    }
});

export {
    accountNameSignUpSlice,
    profileNameSignUpSlice, 
    passwordSignUpSlice, 
    correctPasswordSignUpSlice
};