import { createSlice } from "@reduxjs/toolkit";

const createProjectName = createSlice({
    name: "createProjectName",
    initialState: "",
    reducers: {
        add(state, action) {
            return action.payload;
        },
        clean() {
            return "";
        }
    }
});

const createProjectDescription = createSlice({
    name: "createProjectDescription",
    initialState: "",
    reducers: {
        add(state, action) {
            return action.payload;
        },
        clean() {
            return "";
        }
    }
});

export {
    createProjectName,
    createProjectDescription
};