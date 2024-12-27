import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectsSlice } from "../../features/user/databaseSlice";
import { fetchCreateProject } from "../../features/project/projectAPI";
import { convertFromBooleanToDisplay, convertDateToISOString } from "../../app/user/User";
import { profileNameSlice } from "../../features/user/databaseSlice.js";
import './CreateProject.css';

function CreateProjectForm() {
    const dispatch = useDispatch();
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [createProjectDisplay, setCreateProjectDisplay] = useState(false);
    const [message, setMessage] = useState("");

    const profileName = useSelector(state => state[profileNameSlice.name]);

    const accountName = localStorage.getItem("accountName");
    const today = new Date();
    const todayString = convertDateToISOString(today);

    const onClickToggleForm = () => { setCreateProjectDisplay(!createProjectDisplay); };
    const onChangeProjectName = event => { setProjectName(event.target.value); };
    const onChangeProjectDescription = event => { setProjectDescription(event.target.value); };
    const onClickCloseDialog = () => { setMessage(""); };

    const onSubmitCreateProject = event => {
        event.preventDefault();
       
        fetchCreateProject(accountName, projectName, projectDescription)
        .then(response => {
            setMessage(response.message);
            if (!response.error) {
                const newProject = {
                    projectName,
                    projectTimeCreated: todayString,
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
            <div id="projectHeader">
                <h2>Hello {profileName} !&#128526;</h2>
                <button onClick={onClickToggleForm} id="openCreateProjectButton" style={{display: convertFromBooleanToDisplay(!createProjectDisplay)}}><span>&#x271A; Create project</span></button>
            </div>
            <form style={{display: convertFromBooleanToDisplay(createProjectDisplay)}} onSubmit={onSubmitCreateProject} id="createProjectFormMain">
                <fieldset>
                    <legend><span>Create project form</span></legend>
                    <div id="createProjectInputDiv">
                        <div className="createProjectInput">
                            <label htmlFor="projectName">Project's name<span style={{color: "red"}}>&#42;</span></label>
                            <input type="text" name="projectName" id="projectName" required onChange={onChangeProjectName} value={projectName} autoComplete="off" placeholder="Default" minLength="1" maxLength="50"/>
                        </div>
                        <div className="createProjectInput">
                            <label htmlFor="projectDescription">Project's description<span style={{color: "red"}}>&#42;</span></label>
                            <input type="text" name="projectDescription" id="projectDescription" onChange={onChangeProjectDescription} value={projectDescription} autoComplete="off" placeholder="Create to-do list" minLength="1" maxLength="50"/>
                        </div>         
                    </div>
                    <div id="createProjectButton">
                        <div id="createProjectButtonCreate">
                            <input type="submit" name="createNewProject" id="createNewProject"/>
                            <label htmlFor="createNewProject"><span>New project</span></label>
                        </div>
                        <div id="createProjectButtonCancel">
                            <input type="button" name="cancelNewProject" id="cancelNewProject" onClick={onClickToggleForm}/>
                            <label htmlFor="cancelNewProject"><span>Cancel</span></label>
                        </div>
                    </div>
                </fieldset>
            </form>
            <CreateProjectDialog message={message} onClickCloseDialog={onClickCloseDialog}/>
        </div>
    )
}

function CreateProjectDialog(props) {
    const { message, onClickCloseDialog } = props;

    if (message === 'Create project successfully') {
        return (
            <div id="dialog" className={`${message === "" ? "notVisibleDialog" : "visibleDialog"} errorDialog`}>
                <div id="createProjectDialog" className={message === "" ? "notVisibleCreateProjectDialog" : "visibleCreateProjectDialog"}>
                    <p id="symbol" className="successSymbol"><span>&#10003;</span></p>
                    <p className="message">{message}</p>
                    <button onClick={onClickCloseDialog} id="buttonCloseDialog"><span>Close</span></button>
                </div>
            </div>
        );
    }
    else {
        return (
            <div id="dialog" className={`${message === "" ? "notVisibleDialog" : "visibleDialog"} errorDialog`}>
                <div id="createProjectDialog" className={message === "" ? "notVisibleCreateProjectDialog" : "visibleCreateProjectDialog"}>
                    <p id="symbol" className="errorSymbol"><span>&#10007;</span></p>
                    <div className="message">
                        <p>Cannot create new project</p>
                        <p>{message}</p>
                    </div>
                    <button onClick={onClickCloseDialog} id="buttonCloseDialog"><span>Close</span></button>
                </div>
            </div>
        );
    }

}   
export default CreateProjectForm;
