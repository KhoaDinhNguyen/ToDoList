import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
    name: "projects",
    initialState: [],
    reducers: {
        initialize(state, action) {
            state = [];
            for (const data of action.payload) {
                const { projectName, projectDescription, projectTimeCreated } = data;
                const currentProject = { projectName, projectDescription, projectTimeCreated };

                const existProject = state.find(project => project.projectName === currentProject.projectName);
                if (existProject === undefined) {
                    //TODO: sort project
                    state.push(currentProject);
                }
                else continue;
            }
            return state;
        },
        add(state, action) {
            const {projectName, projectDescription, projectTimeCreated} = action.payload;
            state.push({ projectName, projectDescription, projectTimeCreated });
            return state;
        },
        remove(state, action) {
            const projectName = action.payload;
            return state.filter((data) => {
                return data.projectName !== projectName;
            });
        }
    }
});

const tasksSlice = createSlice({
    name: "tasks",
    initialState: [],
    reducers: {
        initialize(state, action) {
            state = [];
            for (const data of action.payload) {
                const { taskName, taskStatus, taskDescription, taskTimeCreated, taskTimeDeadline, projectName } = data;
                if (taskName !== null) state.push({ taskName, taskStatus, taskDescription, taskTimeCreated, taskTimeDeadline, projectName });
            }
            return state;
        },
        add(state, action) {
            const {taskName, taskStatus, taskDescription, taskTimeCreated, taskTimeDeadline, projectName} = action.payload;
            state.push( {taskName, taskStatus, taskDescription, taskTimeCreated, taskTimeDeadline, projectName});
            return state;
        },
        remove(state, action) {
            const {taskName, projectName} = action.payload;
            state = state.filter((data) => {
                return data.taskName !== taskName || data.projectName !== projectName;
            });
            return state;
        },
        removeFromProject(state, action) {
            const projectName = action.payload;
            return state.filter((data) => {
                return data.projectName !== projectName;
            });
        },
        changeStatus(state, action) {
            const { taskName, projectName, newStatus } = action.payload;
            state.forEach((task) => {
                if (task.taskName === taskName && task.projectName === projectName) {
                    task.taskStatus = newStatus;
                }
            });

            return state;
        }
    }
});

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        statusFilter: ['pending', 'fulfilled', 'falling'],
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
})
export {
    projectsSlice,
    tasksSlice,
    filterSlice,
    sortSlice
}