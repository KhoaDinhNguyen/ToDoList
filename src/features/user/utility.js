import { createSlice } from "@reduxjs/toolkit";

const filterStatusSlice = createSlice({
    name: "filterStatus",
    initialState: ['pending', 'fulfilled', 'failing'],
    reducers: {
        apply(state, action) {
            return action.payload;
        }
    }
});

const filterImportantSlice = createSlice({
    name: "filterImportantSlice",
    initialState: false,
    reducers: {
        apply(state, action) {
            return action.payload;
        }
    }
});

const filterTimeCreatedFromSlice = createSlice({
    name: "filterTimeCreatedForm",
    initialState: "",
    reducers: {
        apply(state, action) {
            return action.payload;
        }
    }
});

const filterTimeCreatedToSlice = createSlice({
    name: "filterTimeCreatedTo",
    initialState: "",
    reducers: {
        apply(state, action) {
            return action.payload;
        }
    }
});

const filterTimeDeadlineFromSlice = createSlice({
    name: "filterTimeDeadlineForm",
    initialState: "",
    reducers: {
        apply(state, action) {
            return action.payload;
        }
    }
});

const filterTimeDeadlineToSlice = createSlice({
    name: "filterTimeDeadlineTo",
    initialState: "",
    reducers: {
        apply(state, action) {
            return action.payload;
        }
    }
});


const sortTaskNameSlice = createSlice({
    name: "sortTaskNameSlice",
    initialState: null,
    reducers: {
        apply(state, action) {
            return action.payload;
        }
    }
});

const sortTimeCreatedSlice = createSlice({
    name: "sortTimeCreated",
    initialState: null,
    reducers: {
        apply(state, action) {
            return action.payload;
        }
    }
});

const sortTimeDeadlineSlice = createSlice({
    name: "sortTimeDeadline",
    initialState: true,
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
    filterImportantSlice,
    filterStatusSlice,
    filterTimeCreatedFromSlice,
    filterTimeCreatedToSlice,
    filterTimeDeadlineFromSlice,
    filterTimeDeadlineToSlice,
    sortTaskNameSlice,
    sortTimeCreatedSlice,
    sortTimeDeadlineSlice,
    searchSlice,
    createProjectFormSlice,
    filterAndSortFormSlice
}