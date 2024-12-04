import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        statusFilter: ['pending', 'fulfilled', 'failing'],
        dateFilter: {
            timeCreatedFrom : "",
            timeCreatedTo: "",
            timeDeadlineFrom: "",
            timeDeadlineTo: ""
        }
    },
    reducers: {
        apply(state, action) {
            return action.payload;
        }
    }
});

const sortSlice = createSlice({
    name: "sort",
    initialState: {
        sortTaskName: true,
        sortTimeCreated: undefined,
        sortTimeDeadline: undefined
    },
    reducers: {
        apply(state, action) {
            return action.payload;
        }
    }
});

const searchSlice = createSlice({
    name: "search",
    initialState: "",
    reducers: {
        apply(state, action) {
            return action.payload
        }
    }
});

export {
    filterSlice,
    sortSlice,
    searchSlice
}