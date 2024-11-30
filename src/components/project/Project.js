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
            <ul>
                {listProject}
            </ul>
        </>
    );
}

function Project(props) {
    const { listTask, project } = props;
    const { projectName, projectDescription, projectTimeCreated } = project;
    const [infoDisplay, setInfoDisplay] = useState('none');
    const [editDisplay, setEditDisplay] = useState('none');

    const accountName = localStorage.getItem("accountName");   

    const onClickEdit = () => { setEditDisplay('block'); };
    const onClickDisplayProjectInfo = () => { 
        setEditDisplay('none');
        if (infoDisplay === 'none') { setInfoDisplay('block'); }
        else { setInfoDisplay('none'); } 
    };

    return (
        <>
            <li>
                <h3>{projectName}</h3>
                <button onClick={onClickDisplayProjectInfo}>Project information</button>
                <div className="projectInfo" style={{display: infoDisplay}}>
                    <div className="projectDescription" style={{display: negateDisplay(editDisplay)}}>
                        <p>Project name: {projectName}</p>
                        <p>Project description: {projectDescription}</p>
                        <p>Project time created: {projectTimeCreated}</p>
                    </div>
                    <button onClick={onClickEdit} style={{display: negateDisplay(editDisplay)}}>Edit</button>
                    <UpdateProject editDisplay={editDisplay} setEditDisplay={setEditDisplay} setInfoDisplay={setInfoDisplay} project={project} infoDisplay={infoDisplay}/>
                    <DeleteProject accountName={accountName} projectName={projectName} />
                </div>
                <ul>
                    {listTask}
                </ul>
                <CreateTaskForm projectName={projectName}/>
            </li>
        </>
    )
}

export function negateDisplay(display) {
    if (display === 'none') return 'block';
    else return 'none';
}

export default ListProject;
