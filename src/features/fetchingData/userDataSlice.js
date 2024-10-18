import { createSlice } from "@reduxjs/toolkit";

export const fullNameSlice = createSlice({
    name: "fullName",
    initialState: "",
    reducers: {
        initialize(state, action) {
            state = action.payload;
            return state;
        }
    }
});

export const passwordSlice = createSlice({
    name: "password",
    initialState: "",
    reducers: {
        initialize(state, action) {
            state = action.payload;
            return state;
        }
    }
})