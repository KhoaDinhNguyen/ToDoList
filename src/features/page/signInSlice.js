import { createSlice } from "@reduxjs/toolkit";

const accountNameLoginSlice = createSlice({
    name: "accountNameLogin",
    initialState: "",
    reducers: {
        add(state, action) {
            return action.payload;
        },
        clean(state) {
            return "";
        }
    }
});

const passwordLoginSlice = createSlice({
    name: "passwordLogin",
    initialState: "",
    reducers: {
        add(state, action) {
            return action.payload;
        },
        clean(state) {
            return "";
        }
    }
});

export {
    accountNameLoginSlice,
    passwordLoginSlice, 
};
