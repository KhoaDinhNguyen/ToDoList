import { createSlice } from "@reduxjs/toolkit";

function returnProjectFromData(projectName, projectDescription, projectTimeCreated) {
    return {
        projectName,
        projectDescription,
        projectTimeCreated
    }
}

function returnTaskFromData(taskName, taskStatus, taskDescription, taskTimeCreated, taskTimeDeadline, projectName) {
    return {
        taskName,
        taskDescription,
        taskStatus,
        taskTimeCreated,
        taskTimeDeadline,
        projectName
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
                const { projectName, projectDescription, projectTimeCreated } = data;
                const currentProject = returnProjectFromData(projectName, projectDescription, projectTimeCreated);
                if (!set.has(currentProject)) {
                    state.push(currentProject);
                    set.add(currentProject);
                }
            }
            return state;
        },
        add(state, action) {
            const {projectName, projectDescription, projectTimeCreated} = action.payload;
            state.push(returnProjectFromData(projectName, projectDescription, projectTimeCreated));
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

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: [],
    reducers: {
        initialize(state, action) {
            state = [];
            for (const data of action.payload) {
                const { taskName, taskStatus, taskDescription, taskTimeCreated, taskTimeDeadline, projectName } = data;
                if (taskName !== null) {
                    state.push(
                        returnTaskFromData(taskName, taskStatus, taskDescription, taskTimeCreated, taskTimeDeadline, projectName)
                    );
                }
            }
            return state;
        },
        add(state, action) {
            const {taskName, taskStatus, taskDescription, taskTimeCreated, taskTimeDeadline, projectName} = action.payload;
            if (taskName !== null) {
                state.push(returnTaskFromData(taskName, taskStatus, taskDescription, taskTimeCreated, taskTimeDeadline, projectName));
            }
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
        }
    }
})