import { useState } from "react";
import { createProjectName, createProjectDescription } from "../../features/project/createProjectSlice";
import { useDispatch, useSelector } from "react-redux";
import { projectsSlice } from "../../features/user/databaseSlice";
import { fetchCreateProject } from "../../features/project/projectAPI";

function CreateProjectForm(props) {
    const dispatch = useDispatch();
    const projectName = useSelector(state => state[createProjectName.name]);
    const projectDescription = useSelector(state => state[createProjectDescription.name]);

    const [message, setMessage] = useState("");
    const [display, setDisplay] = useState("none");

    const accountName = localStorage.getItem("accountName");
    const currentDate = new Date().toJSON().slice(0, 10);

    const closeForm = () => {
        setDisplay("none");
    }

    const openForm = () => {
        setDisplay("block");
    }

    const onChangeProjectName = (event) => {
        dispatch(createProjectName.actions.add(event.target.value));
    }

    const onChangeProjectDescription = (event) => {
        dispatch(createProjectDescription.actions.add(event.target.value));
    }

    const onSubmitCreateProject = (event) => {
        event.preventDefault();
       
        fetchCreateProject(accountName, projectName, projectDescription)
        .then(response => {
            setMessage(response.message);
            if (response.message === "Create project sucessfully") {
                const newProject = {
                    projectName,
                    projectTimeCreated: currentDate,
                    projectDescription
                }
                dispatch(projectsSlice.actions.add(newProject));
                dispatch(createProjectName.actions.clean());
                dispatch(createProjectDescription.actions.clean());

                setTimeout(() => {
                    setMessage("");
                }, 2000);
                setDisplay("none");
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
            <form style={{display: display}} onSubmit={onSubmitCreateProject}>
                <label htmlFor="projectName">Project name: </label>
                <input type="text" name="projectName" id="projectName" required onChange={onChangeProjectName} value={projectName} autoComplete="off"/>
                <br></br>
                <label htmlFor="projectDescription">Project description: </label>
                <input type="text" name="projectDescription" id="projectDescription" onChange={onChangeProjectDescription} value={projectDescription} autoComplete="off"/>
                <br></br>
                <input type="submit" name="createNewProject" id="createNewProject" value="Create"/>
            </form>
            <Response message={message}/>
        </>
    )
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
