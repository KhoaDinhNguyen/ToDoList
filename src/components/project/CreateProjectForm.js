import { useState } from "react";
import { useDispatch } from "react-redux";
import { projectsSlice } from "../../features/user/databaseSlice";
import { fetchCreateProject } from "../../features/project/projectAPI";
import { convertFromBooleanToDisplay } from "../../app/user/User";
import './CreateProject.css';

function CreateProjectForm() {
    const dispatch = useDispatch();
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [createProjectDisplay, setCreateProjectDisplay] = useState(false);

    const accountName = localStorage.getItem("accountName");
    const currentDate = new Date().toISOString().slice(0, 10);

    const onClickToggleForm = () => { setCreateProjectDisplay(!createProjectDisplay); };
    const onChangeProjectName = event => { setProjectName(event.target.value); };
    const onChangeProjectDescription = event => { setProjectDescription(event.target.value); };

    const onSubmitCreateProject = event => {
        event.preventDefault();
       
        fetchCreateProject(accountName, projectName, projectDescription)
        .then(response => {
            alert(response.message);
            if (!response.error) {
                const newProject = {
                    projectName,
                    projectTimeCreated: currentDate,
                    projectDescription
                };
                dispatch(projectsSlice.actions.add(newProject));
                setProjectName("");
                setProjectDescription("");
                setCreateProjectDisplay(false);
            } 
        })
        .catch(err => {
            console.log(err);
        })

    }

    return(
        <div id="createProjectForm">
            <button onClick={onClickToggleForm} id="openCreateProjectButton" style={{display: convertFromBooleanToDisplay(!createProjectDisplay)}}>&#x271A; Create project</button>
            <form style={{display: convertFromBooleanToDisplay(createProjectDisplay)}} onSubmit={onSubmitCreateProject}>
                <div className="createProjectInput">
                    <label htmlFor="projectName">Project name: </label>
                    <input type="text" name="projectName" id="projectName" required onChange={onChangeProjectName} value={projectName} autoComplete="off"/>
                </div>
                <div className="createProjectInput">
                    <label htmlFor="projectDescription">Project description: </label>
                    <input type="text" name="projectDescription" id="projectDescription" onChange={onChangeProjectDescription} value={projectDescription} autoComplete="off"/>
                </div>
                <div id="createProjectButton">
                    <input type="submit" name="createNewProject" id="createNewProject" value="Create project"/>
                    <input type="button" value="Cancel" onClick={onClickToggleForm}/>
                </div>
            </form>
        </div>
    )
}

export default CreateProjectForm;
