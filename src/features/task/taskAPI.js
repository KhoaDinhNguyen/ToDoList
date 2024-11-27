import { createSearchParams } from "react-router-dom";

const fetchTaskCreate = async (accountName, projectName, taskName, taskDescription, taskTimeDeadline) => {
    const environment = process.env.NODE_ENV;
    const createTaskAPI = process.env[`REACT_APP_CREATE_TASK_API_URL_${environment.toUpperCase()}`];
    const createTaskEndpointAPI = `${createTaskAPI}/${accountName}`;

    try {
        const jsonResponse = await fetch(createTaskEndpointAPI, {
            method: 'POST',
            body: JSON.stringify({
                taskName,
                projectName,
                taskDescription,
                taskTimeDeadline
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });
        const response = await jsonResponse.json();
        return response;
    }
    catch(err) {
        return err;
    }
}

const fetchTaskDelete = async (accountName, projectName, taskName) => {
    const environment = process.env.NODE_ENV;
    const deleteTaskAPI = process.env[`REACT_APP_DELETE_TASK_API_URL_${environment.toUpperCase()}`];

    const searchQueryParams = {
        taskName,
        projectName
    }

    const searchQueryString = createSearchParams(searchQueryParams);
    const deleteTaskEndpoint = `${deleteTaskAPI}/${accountName}?${searchQueryString}`;
    
    try {
        const jsonRespnse = await fetch(deleteTaskEndpoint, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        const response = await jsonRespnse.json();

        return response;
    }
    catch(err) {
        return err;
    }
}

const fetchTaskUpdate = async (taskInfo, type) => {
    const environment = process.env.NODE_ENV;
    const updateTaskAPI = process.env[`REACT_APP_UPDATE_TASK_API_URL_${environment.toUpperCase()}`];
    const {taskName, projectName, newImportantStatus, accountName} = taskInfo;
    const endpoint = `${updateTaskAPI}/${accountName}/${type}`;

    const body = JSON.stringify({
        taskName,
        projectName,
        newImportantStatus
    });

    try {
        const jsonRespone = await fetch(endpoint, {
            method: 'PUT',
            headers: {  
                'Content-type' : 'application/json'
            },
            body: body
        });

        const response = await jsonRespone.json();
        return response;
    }
    catch(err) {
        throw new Error(err.message);
    };
};

export {
    fetchTaskCreate,
    fetchTaskUpdate,
    fetchTaskDelete
};