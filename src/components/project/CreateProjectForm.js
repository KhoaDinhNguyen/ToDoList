import { useState } from "react";
import { newProjectDescription, newProjectName } from "../../features/createProject/projectInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { projectsSlice } from "../../features/fetchingData/databaseDataSlice";

const url = process.env.REACT_APP_CREATE_PROJECT_API_URL;

function CreateProjectForm(props) {
    const [visibility, setVisibility] = useState("hidden");
    const dispatch = useDispatch();
    const projectName = useSelector(state => state[newProjectName.name]);
    const projectDescription = useSelector(state => state[newProjectDescription.name]);
    const params = useParams();
    const userName = params.username;
    const endpoint = url + userName;

    const [message, setMessage] = useState("");

    const closeForm = () => {
        setVisibility("hidden");
    }

    const openForm = () => {
        setVisibility("visible");
    }

    const onChangeProjectName = (event) => {
        dispatch(newProjectName.actions.add(event.target.value));
    }

    const onChangeProjectDescription = (event) => {
        dispatch(newProjectDescription.actions.add(event.target.value));
    }

    const onSubmitCreateProject = (event) => {
        event.preventDefault();
        const body = JSON.stringify({projectName: projectName, projectDescription: projectDescription});
        createProjectAPI(endpoint, body)
        .then(response => {
            setMessage(response.message);
            if (response.message === "Create project sucessfully") {
                // TODO: adject time created;
                const newProject = {
                    project_name: projectName,
                    project_time_created: "",
                    project_description: projectDescription
                }
                dispatch(projectsSlice.actions.add(newProject));
            } 
        })
        .catch(err => {
            console.log(err);
        })

    }

    return(
        <>  
            <button onClick={openForm}>Create new project</button>
            <button onClick={closeForm}>Close the form</button>
            <form style={{visibility: visibility}} onSubmit={onSubmitCreateProject}>
                <label htmlFor="projectName">Project name: </label>
                <input type="text" name="projectName" id="projectName" required onChange={onChangeProjectName} value={projectName}/>
                <br></br>
                <label htmlFor="projectDescription">Project description: </label>
                <input type="text" name="projectDescription" id="projectDescription" onChange={onChangeProjectDescription} value={projectDescription}/>
                <br></br>
                <input type="submit" name="createNewProject" id="createNewProject" value="Create"/>
            </form>
            <Response message={message}/>
        </>
    )
}

const createProjectAPI = async (endpoint, body) => {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            body: body,
            headers: {
                'Content-type' : 'application/json'
            },
        });

        const jsonResponse = await response.json();
        return jsonResponse;
    }
    catch(err) {
        console.log(err);
    }
}

function Response(props) {
    const message = props.message;

    if (message === "") {
        return (
            <></>
        )
    }
    if (message === "duplicate key value violates unique constraint \"projects_pkey\"") {
        return (
            <p>Project name duplicate</p>
        )
    }

    return <p>{message}</p>
}
export default CreateProjectForm;
