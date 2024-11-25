import { createSearchParams } from "react-router-dom";

const updateTaskAPI = process.env.REACT_APP_PROD_CREATE_TASK_API_URL;
const deleteTaskAPI = process.env.REACT_APP_PROD_UPDATE_TASK_API_URL;
const createTaskAPI = process.env.REACT_APP_PROD_DELETE_TASK_API_URL;

const fetchTaskCreate = async (accountName, projectName, taskName, taskDescription, taskTimeDeadline) => {
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

const fetchTaskUpdate = async (accountName, taskName, projectName, type) => {
    const endpoint = `${updateTaskAPI}/${accountName}/${type}`;
    const body = JSON.stringify({
        taskName,
        projectName
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