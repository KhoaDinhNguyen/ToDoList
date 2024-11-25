import { projectsSlice, tasksSlice, dataSlice, filterSlice } from "../../features/user/databaseSlice";
import { useSelector } from "react-redux";
import { DefaultTaskDisplay } from "../task/taskDisplay";
import CreateTaskForm from "../task/CreateTaskForm";
import { useState } from "react";
import DeleteProject from "./DeleteProject";
import { useDispatch } from "react-redux";
import { filterTask } from "../../features/task/filterTask";

function ListProject() {
    const projects = useSelector((state) => state[projectsSlice.name]);
    const tasks = useSelector((state) => state[tasksSlice.name]);
    //const data = useSelector(state => state[dataSlice.name]);
    const filter = useSelector(state => state[filterSlice.name]);
    /*
    useEffect(() => {
        dispatch(dataSlice.actions.applyFilter({projects, tasks, filter}));

    }, [projects, tasks, filter, dispatch])
    */
    console.log("HHA");
    const listProject = [];

    const copyTasks = tasks.map(task => task);

    for (const project of projects) {
        const arrayOfTask = filterTask(copyTasks, project.projectName, filter);
        listProject.push(<Project key={project.projectName} tasks={arrayOfTask} project={project}/>);
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
    const {projectName, projectDescription, projectTimeCreated } = props.project;

    const tasks = props.tasks;

    const accountName = localStorage.getItem("accountName");

    const listTask = [];
    for (const task of tasks) {
        listTask.push(<DefaultTaskDisplay key={`${projectName}${task.taskName}`} task={task}/>)
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
