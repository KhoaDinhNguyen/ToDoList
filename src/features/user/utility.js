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
        sortTaskName: undefined,
        sortTimeCreated: undefined,
        sortTimeDeadline: true
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

const createProjectFormSlice = createSlice({
    name: "createProjectFor",
    initialState: false,
    reducers: {
        setState(state, action) {
            return action.payload;
        }
    }
});

const filterAndSortFormSlice = createSlice({
    name: "filterFormSlice",
    initialState: false,
    reducers: {
        setState(state, action) {
            return action.payload;
        },
        toggle(state) {
            return !state;
        }
    }
});

export {
    filterSlice,
    sortSlice,
    searchSlice,
    createProjectFormSlice,
    filterAndSortFormSlice
}