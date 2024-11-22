import { createSlice } from "@reduxjs/toolkit";

const currentDate = new Date().toJSON().slice(0, 10);

export const newTaskName = createSlice({
    name: "taskName",
    initialState: "",
    reducers: {
        add(state, action) {
            return action.payload;
        },
        clear(state) {
            return "";
        }
    }
});

export const newTaskDescription = createSlice({
    name: "taskDescription",
    initialState: "",
    reducers: {
        add(state, action) {
            return action.payload;
        },
        clear(state) {
            return "";
        }
    }
});

export const newTaskDeadline = createSlice({
    name: "taskDeadline",
    initialState: currentDate,
    reducers: {
        add(state, action) {
            return action.payload;
        },
        clear(state) {
            return "";
        }
    }
})