import { projectsSlice, tasksSlice } from "../features/fetchingData/databaseDataSlice";
import { useSelector } from "react-redux";

// Create object of object to easily access the data without join in
// Cons: many tasks will effect the memory
function handleProjectsAndTasks(projects, tasks, filter) {
    console.log(projects);
    const data = {};
    for (const project of projects) {
        data[project.project_name] = {
            project_description: project.project_description,
            project_time_created : project.project_time_created,
            tasks: {}
        }
    }
    for (const task of tasks) {
        data[task.project_name].tasks[task.task_name] = {
            status: task.status,
            task_deadline: task.task_deadline,
            task_time_created : task.task_time_created,
            task_description: task.task_description
        }
    }

    return data;
}

function ListProject(prop) {
    const projects = useSelector((state) => state[projectsSlice.name]);
    const tasks = useSelector((state) => state[tasksSlice.name]);

    const data = handleProjectsAndTasks(projects, tasks, {});
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

function Project(prop) {
    const project = prop.project;
    const projectName = prop.name;

    const listTask = [];
    for (const task in project.tasks) {
        listTask.push(<Task key={task} task={project[task]} name={task}/>)
    }

    return (
        <>
            <li>
                <h3>{projectName}</h3>
                <ul>
                    {listTask}
                </ul>
            </li>
        </>
    )
}

function Task(prop) {
    const taskName = prop.name;

    return (
        <>
            <li><h4>{taskName}</h4></li>
        </>
    )
}

export default ListProject;