import { createSearchParams } from "react-router-dom";

const deleteProjectAPI = process.env.REACT_APP_DELETE_PROJECT_API_URL;
const createProjectAPI = process.env.REACT_APP_CREATE_PROJECT_API_URL;

const fetchDeleteProject = async (accountName, projectName) => {
    const searchQueryParams = {
        projectName
    };
    const searchQueryString = createSearchParams(searchQueryParams);
    const endpoint = `${deleteProjectAPI}/${accountName}?${searchQueryString}`;

    try {
        const jsonResponse = await fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Content-type' : 'application/json'
            }
        });
    
        const response = jsonResponse.json();

        return response;
    }
    catch(err) {
        throw new Error(err);
    }
}

const fetchCreateProject = async (accountName, projectName, projectDescription) => {
    const endpoint = `${createProjectAPI}/${accountName}`;
    const body = JSON.stringify({projectName, projectDescription});

    try {
        const jsonResponse = await fetch(endpoint, {
            method: 'POST',
            body: body,
            headers: {
                'Content-type' : 'application/json'
            },
        });

        const response = await jsonResponse.json();
        return response;
    }
    catch(err) {
        return err;
    }
}

export {
    fetchCreateProject,
    fetchDeleteProject
};