import { createSlice } from "@reduxjs/toolkit";

export const newProjectName = createSlice({
    name: "newProjectName",
    initialState: "",
    reducers: {
        add(state, action) {
            return action.payload;
        },
        clear() {
            return "";
        }
    }
});

export const newProjectDescription = createSlice({
    name: "newProjectDescription",
    initialState: "",
    reducers: {
        add(state, action) {
            return action.payload;
        },
        clear() {
            return "";
        }
    }
})