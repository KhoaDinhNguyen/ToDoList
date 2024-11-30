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
        },
        updateInfo(state, action) {
            const { projectName, newProjectName, newProjectDescription } = action.payload;
            state.forEach(project => {
                if (project.projectName === projectName) {
                    project.projectName = newProjectName;
                    project.projectDescription = newProjectDescription;
                }
            });

            return state;
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
                const { taskName, taskStatus, taskDescription, taskTimeCreated, taskTimeDeadline, projectName, taskImportant } = data;
                if (taskName !== null) state.push({ taskName, taskStatus, taskDescription, taskTimeCreated, taskTimeDeadline, projectName, taskImportant });
            }
            return state;
        },
        add(state, action) {
            const {taskName, taskStatus, taskDescription, taskTimeCreated, taskTimeDeadline, projectName, taskImportant} = action.payload;
            state.push( {taskName, taskStatus, taskDescription, taskTimeCreated, taskTimeDeadline, projectName, taskImportant});
            console.log(taskTimeDeadline);
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
        },
        changeImportant(state, action) {
            const { taskName, projectName, newTaskImportant} = action.payload;
            state.forEach(task => {
                if (task.taskName === taskName && task.projectName === projectName) {
                    task.taskImportant = newTaskImportant;
                }
            });

            return state;
        },
        updateInfo(state, action) {
            const { taskName, projectName, newTaskName, newTaskDescription, newTaskTimeDeadline} = action.payload;

            state.forEach(task => {
                if (task.taskName === taskName && task.projectName === projectName) {
                    task.taskName = newTaskName;
                    task.taskDescription = newTaskDescription;
                    task.taskTimeDeadline = newTaskTimeDeadline;
                }
            });

            return state;
        },
        updateInfoFromProject(state, action) {
            const { projectName, newProjectName } = action.payload;

            state.forEach(task => {
                if (task.projectName === projectName) {
                    task.projectName = newProjectName
                }
            });

            return state;
        }
    }
});

export {
    projectsSlice,
    tasksSlice,
}