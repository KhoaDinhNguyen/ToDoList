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
import { splitTask } from "../../features/task/finishTask";
import { countTask } from "../../features/task/countTask";
import UpdateProject from "./UpdateProject";
import './Project.css';
import editImg from '../../img/user/edit.png';
import deleteImg from '../../img/user/delete.png';
import { convertFromBooleanToDisplay } from "../../app/user/User";

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
        const [finishedTask, unfinishedTask] = splitTask(sortTasks);
        const [numOfPendingTask, numOfFulfilledTask, numOfFailingTask] = countTask(filterTasks);
        const listTask = [];
        const finishedListTask = [];
        //console.log(numOfPendingTask);
        for (const task of unfinishedTask) {
            listTask.push(<TaskDisplay key={`${project.projectName}${task.taskName}`} task={task}/>);
        }
        for (const task of finishedTask) {
            finishedListTask.push(<TaskDisplay key={`${project.projectName}${task.taskName}`} task={task}/>);
        }

        listProject.push(<Project 
            key={project.projectName} 
            listTask={listTask} 
            finishedListTask={finishedListTask} 
            project={project}
            numOfPendingTask={numOfPendingTask}
            numOfFulfilledTask={numOfFulfilledTask}
            numOfFailingTask={numOfFailingTask}
            />);
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
    const { listTask, project, finishedListTask, numOfFailingTask, numOfFulfilledTask, numOfPendingTask } = props;
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
                    <div className="projectHeader" onClick={onClickDisplayProjectInfo}>
                        <h3>{projectName}</h3>
                    </div>
                    <div className={`projectMain ${!infoDisplay ? "hiddenProject" : "visibleProject"} ${deleteDisplay ? "backgroundDelete": "backgroundNonDelete"}`}>
                        <div className="projectDescription" style={{display: convertFromBooleanToDisplay(!editDisplay && !deleteDisplay)}}>
                            <p><span style={{fontWeight: 500}}>Project name:</span> {projectName}</p>
                            <p><span style={{fontWeight: 500}}>Project description:</span> {projectDescription}</p>
                            <p><span style={{fontWeight: 500}}>Project time created:</span> {projectTimeCreated}</p>
                        </div>
                        <UpdateProject editDisplay={convertFromBooleanToDisplay(editDisplay)} setEditDisplay={setEditDisplay} project={project}/>
                        <DeleteProject accountName={accountName} projectName={projectName} deleteDisplay={convertFromBooleanToDisplay(deleteDisplay)} setDeleteDisplay={setDeleteDisplay}/>
                        <div className="projectFunction">
                            <div onClick={onClickEdit} style={{display: convertFromBooleanToDisplay(!editDisplay && !deleteDisplay)}} className="editButton projectButton">
                                <figure>
                                    <img src={editImg} alt="Edit"/>
                                    <figcaption>Edit</figcaption>
                                </figure>
                            </div>
                            <div onClick={onClickDelete} style={{display: convertFromBooleanToDisplay(!editDisplay && !deleteDisplay)}} className="deleteButton projectButton">
                                <figure>
                                    <img src={deleteImg} alt="Delete"/>
                                    <figcaption>Delete</figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <Progress numOfPendingTask={numOfPendingTask} numOfFulfilledTask={numOfFulfilledTask} numOfFailingTask={numOfFailingTask}/>
                </div>
                <div className="taskList">
                    <div className="unfinishedListTask">
                        <ul>
                            {listTask}
                        </ul>
                    </div>
                    <FinishedTask finishedListTask={finishedListTask}/>
                </div>
                <CreateTaskForm projectName={projectName}/>
            </li>
        </>
    );
}

//export const convertFromBooleanToDisplay = display => display ? "block" : "none";
function FinishedTask(props) {
    const {finishedListTask} = props;
    const [finishedListTaskVisible, setFinishedListTaskVisible] = useState(false);
    
    const onClickFinishedListTaskVisible = () => { setFinishedListTaskVisible(!finishedListTaskVisible); };

    if (finishedListTask.length === 0) {
        return <></>;
    }

    return (
        <div className="finishedListTask">
            <div className="finishedListTaskButton">
                <button onClick={onClickFinishedListTaskVisible} >{finishedListTask.length} finished task(s)</button>
            </div>
            <ul className={finishedListTaskVisible ? "finishedListTaskVisible" : "finishedListTaskNonVisible"}>
                {finishedListTask}
            </ul>
        </div>
    )
}

function Progress(props) {
    const { numOfFulfilledTask, numOfPendingTask, numOfFailingTask} = props;

    const numOfTask = numOfFulfilledTask + numOfPendingTask + numOfFailingTask;
    
    if (numOfTask === 0) {
        return  (
            <div className="progress emptyProgress">
                <table>
                    <tbody>
                        <tr>
                            <td>No tasks</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    const pendingPercent = Math.floor(numOfPendingTask / numOfTask * 100);
    const fulfilledPercent = Math.floor(numOfFulfilledTask / numOfTask * 100);
    const failingPercent = Math.floor(numOfFailingTask / numOfTask * 100);

    return (
        <div className="progress nonEmptyProgress">
            <table>
                <tbody>
                    <tr>
                        {failingPercent !== 0 ? <td style={{width: 180 * failingPercent / 100}} className="failingProcess">{failingPercent}%</td> : <></>}
                        {pendingPercent !== 0 ? <td style={{width: 180 * pendingPercent / 100}} className="pendingProcess">{pendingPercent}%</td> : <></>}
                        {fulfilledPercent !== 0 ? <td style={{width: 180 * fulfilledPercent / 100}} className="fulfilledProcess">{fulfilledPercent}%</td> : <></>}
                    </tr>
                </tbody>
            </table>
        </div>
    );
    
}
export default ListProject;
