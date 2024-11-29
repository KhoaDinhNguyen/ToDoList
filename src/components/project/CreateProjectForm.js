import { useState } from "react";
import { useDispatch } from "react-redux";
import { projectsSlice } from "../../features/user/databaseSlice";
import { fetchCreateProject } from "../../features/project/projectAPI";

function CreateProjectForm() {
    const dispatch = useDispatch();
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [message, setMessage] = useState("");
    const [display, setDisplay] = useState("none");

    const accountName = localStorage.getItem("accountName");
    const currentDate = new Date().toISOString().slice(0, 10);

    const closeForm = () => { setDisplay("none"); }
    const openForm = () => { setDisplay("block"); }
    const onChangeProjectName = event => { setProjectName(event.target.value); }
    const onChangeProjectDescription = event => { setProjectDescription(event.target.value); }

    const onSubmitCreateProject = event => {
        event.preventDefault();
       
        fetchCreateProject(accountName, projectName, projectDescription)
        .then(response => {
            setMessage(response.message);
            if (!response.error) {
                const newProject = {
                    projectName,
                    projectTimeCreated: currentDate,
                    projectDescription
                };
                dispatch(projectsSlice.actions.add(newProject));
                setProjectName("");
                setProjectDescription("");

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
            <p>{message}</p>
        </>
    )
}

export default CreateProjectForm;
