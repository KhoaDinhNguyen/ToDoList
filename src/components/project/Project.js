import { projectsSlice, tasksSlice } from "../../features/user/databaseSlice";
import { useSelector } from "react-redux";
import { DefaultTaskDisplay } from "../task/taskDisplay";
import CreateTaskForm from "../task/CreateTaskForm";
import { useState } from "react";
import DeleteProject from "./DeleteProject";


let data = null;

function handleProjectsAndTasks(projects, tasks, filter) {
    const data = {};
    for (const project of projects) {
        const {projectName, projectDescription, projectTimeCreated} = project;

        data[projectName] = {
            projectName,
            projectDescription,
            projectTimeCreated,
            tasks: {}
        }
    }
    for (const task of tasks) {
        const {taskName, taskStatus, taskDescription, taskTimeCreated, taskTimeDeadline, projectName} = task;

        data[projectName].tasks[taskName] = {
            taskName,
            taskStatus,
            taskDescription,
            taskTimeCreated,
            taskTimeDeadline,
            projectName
        }
    }

    return data;
}

function ListProject(prop) {
    const projects = useSelector((state) => state[projectsSlice.name]);
    const tasks = useSelector((state) => state[tasksSlice.name]);

    data = handleProjectsAndTasks(projects, tasks, {});
    const listProject = [];

    for (const project in data) {
        listProject.push(<Project key={project} project={data[project]} name={project}/>);
    }

    return (
        <>
            <ul>
                {listProject}
            </ul>
        </>
    )
}

function Project(props) {
    const [display, setDisplay] = useState('none');
    const {projectName, projectDescription, projectTimeCreated, tasks } = props.project;

    const accountName = localStorage.getItem("accountName");

    const listTask = [];
    for (const task in tasks) {
        const taskObject = tasks[task];
        const taskName = taskObject.taskName;
        listTask.push(<DefaultTaskDisplay key={`${projectName}${taskName}`} task={taskObject} taskName={taskName}/>)
    }

    const onClickDisplayProjectInfo = () => {
        if (display === 'none') {
            setDisplay('block');
        }
        else {
            setDisplay('none');
        }
    }
    return (
        <>
            <li>
                <h3>{projectName}</h3>
                <button onClick={onClickDisplayProjectInfo}>Project information</button>
                <div className="projectInfo" style={{display: display}}>
                    <p>Project name: {projectName}</p>
                    <p>Project description: {projectDescription}</p>
                    <p>Project time created: {projectTimeCreated.slice(0, 10)}</p>
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
