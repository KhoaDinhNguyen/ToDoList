import { createSlice } from "@reduxjs/toolkit";

function returnProjectFromData(project_name, project_description, project_time_created) {
    return {
        project_name,
        project_description,
        project_time_created
    }
}

function returnTaskFromData(task_name, status, task_description, task_time_created, task_deadline, project_name) {
    return {
        task_name,
        task_description,
        status,
        task_time_created,
        task_deadline,
        project_name
    }
}

export const projectsSlice = createSlice({
    name: "projects",
    initialState: [],
    reducers: {
        initialize(state, action) {
            state = [];
            const set = new Set();
            for (const data of action.payload) {
                const currentProject = returnProjectFromData(data.project_name, data.project_description, data.project_time_created);
                if (!set.has(currentProject)) {
                    state.push(currentProject);
                    set.add(currentProject);
                }
            }
            return state;
        },
        add(state, action) {
            const data = action.payload;
            state.push(returnProjectFromData(data.project_name, data.project_description, data.project_time_created));
            return state;
        },
        remove(state, action) {
            state = [];
            return state;
        }
    }
});

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: [],
    reducers: {
        initialize(state, action) {
            state = [];
            for (const data of action.payload) {
                if (data.task_name !== null) {
                    state.push(
                        returnTaskFromData(data.task_name, data.status, data.task_description, data.task_time_created, data.task_deadline, data.project_name)
                    );
                }
            }
            return state;
        },
        remove(state, action) {
            state = [];
            return state;
        }
    }
})