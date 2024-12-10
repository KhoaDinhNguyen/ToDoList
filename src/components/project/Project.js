import { projectsSlice, tasksSlice } from "../../features/user/databaseSlice";
import { filterSlice, sortSlice, searchSlice } from "../../features/user/utility";
import { useSelector } from "react-redux";
import { TaskDisplay } from "../task/taskDisplay";
import CreateTaskForm from "../task/CreateTaskForm";
import { useState } from "react";
import DeleteProject from "./DeleteProject";
import { filterTask } from "../../features/task/filterTask";
import { sortTask } from "../../features/task/sortTask";
import { searchTask } from "../../features/task/searchTask";
import UpdateProject from "./UpdateProject";
import './Project.css';

function ListProject() {
    const projects = useSelector(state => state[projectsSlice.name]);
    const tasks = useSelector(state => state[tasksSlice.name]);
    const filter = useSelector(state => state[filterSlice.name]);
    const sort = useSelector(state => state[sortSlice.name]);
    const search = useSelector(state => state[searchSlice.name]);

    const listProject = [];

    for (const project of projects) {
        const filterTasks = filterTask(tasks, project.projectName, filter);
        const searchTasks = searchTask(filterTasks, search);
        const sortTasks = sortTask(searchTasks, sort);
        const listTask = [];
        for (const task of sortTasks) {
            listTask.push(<TaskDisplay key={`${project.projectName}${task.taskName}`} task={task}/>);
        }
        listProject.push(<Project key={project.projectName} listTask={listTask} project={project}/>);
    }

    return (
        <>
            <ul id="projectList">
                {listProject}
            </ul>
        </>
    );
}

function Project(props) {
    const { listTask, project } = props;
    const { projectName, projectDescription, projectTimeCreated } = project;
    const [infoDisplay, setInfoDisplay] = useState(false);
    const [editDisplay, setEditDisplay] = useState(false);
    const [deleteDisplay, setDeleteDisplay] = useState(false);
    const accountName = localStorage.getItem("accountName");   

    const onClickEdit = () => { setEditDisplay(true); };
    const onClickDelete = () => { setDeleteDisplay(true); };

    const onClickDisplayProjectInfo = () => { 
        setEditDisplay(false);
        setDeleteDisplay(false)
        setInfoDisplay(!infoDisplay);
    };

    return (
        <>
            <li className="project">
                <div className="projectBody">
                    <div className="projectHeader">
                        <h3>{projectName}</h3>
                        <div className="projectInfoButton">
                            <button onClick={onClickDisplayProjectInfo}>{!infoDisplay ? "\u2BC7": "\u2BC6"}</button>
                        </div>
                    </div>
                    <div className={`projectMain ${!infoDisplay ? "hiddenProject" : "visibleProject"} ${!deleteDisplay ? "backgroundDelete": "backgroundNonDelete"}`}>
                        <div className="projectDescription" style={{display: convertFromBooleanToDisplay(!editDisplay && !deleteDisplay)}}>
                            <p><span style={{fontWeight: 500}}>Project name:</span> {projectName}</p>
                            <p><span style={{fontWeight: 500}}>Project description:</span> {projectDescription}</p>
                            <p><span style={{fontWeight: 500}}>Project time created:</span> {projectTimeCreated}</p>
                        </div>
                        <UpdateProject editDisplay={convertFromBooleanToDisplay(editDisplay)} setEditDisplay={setEditDisplay} project={project}/>
                        <DeleteProject accountName={accountName} projectName={projectName} deleteDisplay={convertFromBooleanToDisplay(deleteDisplay)} setDeleteDisplay={setDeleteDisplay}/>
                        <div className="projectFunction">
                            <button onClick={onClickEdit} style={{display: convertFromBooleanToDisplay(!editDisplay && !deleteDisplay)}}>Edit</button>
                            <button onClick={onClickDelete} style={{display: convertFromBooleanToDisplay(!editDisplay && !deleteDisplay)}}>Delete</button>
                        </div>
                    </div>
                </div>
                <div className="taskList">
                    <ul>
                        {listTask}
                    </ul>
                </div>
                <CreateTaskForm projectName={projectName}/>
            </li>
        </>
    )
}

export const convertFromBooleanToDisplay = display => display ? "block" : "none";

export default ListProject;
