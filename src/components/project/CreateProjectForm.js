import { useSelector, useDispatch } from "react-redux";
import { projectsSlice } from "../../features/user/databaseSlice.js";
import { fetchCreateProject } from "../../features/project/projectAPI.js";
import { convertFromBooleanToDisplay, convertDateToISOString } from "../../app/user/User.js";
import { profileNameSlice } from "../../features/user/databaseSlice.js";
import { useState } from "react";
import { createProjectFormSlice } from "../../features/user/utility.js";
import './CreateProjectForm.css';

function CreateProjectForm () {
    const dispatch = useDispatch();
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [message, setMessage] = useState("");
    const createProjectFormDisplay = useSelector(state => state[createProjectFormSlice.name]);

    const onChangeProjectName = event => { setProjectName(event.target.value); };
    const onChangeProjectDescription = event => { setProjectDescription(event.target.value); };
    const onClickCloseDialog = () => { setMessage(""); };
    const onClickCloseForm = () => { dispatch(createProjectFormSlice.actions.setState(false)); };

    const profileName = useSelector(state => state[profileNameSlice.name]);

    const accountName = localStorage.getItem("accountName");
    const today = new Date();
    const todayString = convertDateToISOString(today);

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
                dispatch(createProjectFormSlice.actions.setState(false));
            } 
        })
        .catch(err => {
            console.log(err);
        })

    }

    return (
        <>  
            <div style={{display: convertFromBooleanToDisplay(createProjectFormDisplay)}} id="createProjectForm">
            <form onSubmit={onSubmitCreateProject} id="createProjectFormMain">
                    <fieldset>
                        <legend><span>Create project form</span></legend>
                        <div id="createProjectInputDiv">
                            <div className="createProjectInput">
                                <label htmlFor="projectName">Project's name<span style={{color: "red"}}>&#42;</span></label>
                                <input type="text" name="projectName" id="projectName" required onChange={onChangeProjectName} value={projectName} autoComplete="off" placeholder="Default" minLength="1" maxLength="50"/>
                            </div>
                            <div className="createProjectInput">
                                <label htmlFor="projectDescription">Project's description</label>
                                <input type="text" name="projectDescription" id="projectDescription" onChange={onChangeProjectDescription} value={projectDescription} autoComplete="off" placeholder="Create to-do list" minLength="1" maxLength="50"/>
                            </div>         
                        </div>
                        <div id="createProjectButton">
                            <div id="createProjectButtonCreate">
                                <input type="submit" name="createNewProject" id="createNewProject"/>
                                <label htmlFor="createNewProject"><span>New project</span></label>
                            </div>
                            <div id="createProjectButtonCancel">
                                <input type="button" name="cancelNewProject" id="cancelNewProject" onClick={onClickCloseForm}/>
                                <label htmlFor="cancelNewProject"><span>Cancel</span></label>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
            <CreateProjectDialog message={message} onClickCloseDialog={onClickCloseDialog}/>
        </>
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