import { useState } from "react";
import { fetchUpdateProject } from "../../features/project/projectAPI";
import { useDispatch } from "react-redux";
import { projectsSlice, tasksSlice } from "../../features/user/databaseSlice";

function UpdateProject (props) {
    const { editDisplay, setEditDisplay, setInfoDisplay, project } = props;
    const { projectName, projectDescription, projectTimeCreated} = project;
    const [ newProjectName, setNewProjectName] = useState(projectName);
    const [ newProjectDescription, setNewProjectDescription] = useState(projectDescription);
    const [ error, setError ] = useState("");

    const dispatch = useDispatch();
    
    const accountName = localStorage.getItem('accountName');

    const onClickCancel = () => {
        setEditDisplay('none');
    };
    const onChangeProjectName =  event => { setNewProjectName(event.target.value); };
    const onChangeProjectDescription = event => { setNewProjectDescription(event.target.value); };

    const onSubmitUpdateProjectInfo = event => {
        event.preventDefault();
        fetchUpdateProject(projectName, accountName, newProjectName, newProjectDescription)
        .then(response => {
            if (!response.error) {
                setInfoDisplay('none');
                setEditDisplay('none');
                dispatch(projectsSlice.actions.updateInfo({
                    projectName,
                    newProjectName,
                    newProjectDescription
                }));
                dispatch(tasksSlice.actions.updateInfoFromProject({
                    projectName,
                    newProjectName
                }));
            }
            else {
                setError(response.message);

                setTimeout(() => {
                    setError("");
                }, 2000);
            }
        })
        .catch(err => {
            console.log(err);
        })
    } 
    return (
        <>
            <div className="editProjectForm" style={{display: editDisplay}}>
                <form onSubmit={onSubmitUpdateProjectInfo}>
                    <label htmlFor="newProjectName">Project name </label>
                    <input type="text" name="newProjectName" id="newProjectName" value={newProjectName} onChange={onChangeProjectName}/>
                    <br/>
                    <label htmlFor="newProjectDescription">Project description </label>
                    <input type="text" name="newProjectDescription" id="newProjectDescription" value={newProjectDescription} onChange={onChangeProjectDescription}/>
                    <br/>
                    <span>Project time created: {projectTimeCreated}</span>
                    <br/>
                    <input type="submit" value="Confirm"/>
                    <p>Cannot change project time created</p>
                </form>
                <button onClick={onClickCancel}>Cancel</button>
                <p>{error}</p>
            </div>
        </>
    )
}


export default UpdateProject;