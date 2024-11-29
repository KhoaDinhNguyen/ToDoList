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
        listProject.push(<Project key={project.projectName} tasks={sortTasks} project={project}/>);
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
    const [display, setDisplay] = useState('none');
    const { tasks, project } = props;
    const {projectName, projectDescription, projectTimeCreated } = project;
    const accountName = localStorage.getItem("accountName");

    const listTask = [];
    for (const task of tasks) { listTask.push(<TaskDisplay key={`${projectName}${task.taskName}`} task={task}/>); }

    const onClickDisplayProjectInfo = () => { 
        if (display === 'none') { setDisplay('block'); }
        else { setDisplay('none'); } 
    }
    return (
        <>
            <li>
                <h3>{projectName}</h3>
                <button onClick={onClickDisplayProjectInfo}>Project information</button>
                <div className="projectInfo" style={{display: display}}>
                    <p>Project name: {projectName}</p>
                    <p>Project description: {projectDescription}</p>
                    <p>Project time created: {projectTimeCreated}</p>
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

export default ListProject;
