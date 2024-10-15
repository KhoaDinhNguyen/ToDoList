import { createSlice } from "@reduxjs/toolkit";

export const userNameLoginSlice = createSlice({
    name: "userNameLogin",
    initialState: "",
    reducers: {
        add(state, action) {
            state = action.payload;
            return state;
        }
    }
});

export const passwordLoginSlice = createSlice({
    name: "passwordLogin",
    initialState: "",
    reducers: {
        add(state, action) {
            state = action.payload;
            return state;
        }
    }
});
