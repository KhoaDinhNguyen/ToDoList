import { useState } from "react";
import { fetchUpdateProject } from "../../features/project/projectAPI";
import { useDispatch } from "react-redux";
import { projectsSlice, tasksSlice } from "../../features/user/databaseSlice";
import './UpdateProject.css';

function UpdateProject (props) {
    const { editDisplay, setEditDisplay, project } = props;
    const { projectName, projectDescription, projectTimeCreated} = project;
    const [ newProjectName, setNewProjectName] = useState(projectName);
    const [ newProjectDescription, setNewProjectDescription] = useState(projectDescription);

    const dispatch = useDispatch();
    
    const accountName = localStorage.getItem('accountName');

    const onClickCancel = () => { setEditDisplay(false);};
    const onChangeProjectName =  event => { setNewProjectName(event.target.value); };
    const onChangeProjectDescription = event => { setNewProjectDescription(event.target.value); };

    const onSubmitUpdateProjectInfo = event => {
        event.preventDefault();
        fetchUpdateProject(projectName, accountName, newProjectName, newProjectDescription)
        .then(response => {
            if (!response.error) {
                setEditDisplay(false);
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
                alert(response.message);
            }
        })
        .catch(err => {
            console.log(err);
        })
    } 
    return (
        <>
            <div className="updateProjectForm" style={{display: editDisplay}}>
                <form onSubmit={onSubmitUpdateProjectInfo}>
                    <div className="updateProjectInput">
                        <label htmlFor={`${projectName}_newProjectName`}>Project name: </label>
                        <input type="text" name={`${projectName}_newProjectName`} id={`${projectName}_newProjectName`} value={newProjectName} onChange={onChangeProjectName}/>
                    </div>
                    <div className="updateProjectInput">
                        <label htmlFor={`${projectName}_newProjectDescription`}>Project description: </label>
                        <input type="text" name={`${projectName}_newProjectDescription`} id={`${projectName}_newProjectDescription`} value={newProjectDescription} onChange={onChangeProjectDescription}/>
                    </div>
                    <div className="updateProjectInput">
                        <p><span>Project time created</span>: {projectTimeCreated}</p>
                    </div>
                    <div className="updateProjectInput">
                        <p className="updateProjectMessage">&#9432; Cannot change project time created</p>
                    </div>
                    <div className="updateProjectFunction">
                        <div className="updateProjectSubmitButton">
                            <input type="submit" name={`submitButtonProject_${projectName}`} id={`submitButtonProject_${projectName}`}/>
                            <label htmlFor={`submitButtonProject_${projectName}`}><span>Apply</span></label>
                        </div>
                        <div className="updateProjectCancelButton">
                            <input type="button" name={`cancelButtonProject_${projectName}`} id={`cancelButtonProject_${projectName}`} onClick={onClickCancel}/>
                            <label htmlFor={`cancelButtonProject_${projectName}`}><span>Cancle</span></label>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}


export default UpdateProject;