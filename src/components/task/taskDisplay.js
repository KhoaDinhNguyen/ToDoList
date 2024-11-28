import { useState } from "react";
import "./taskDisplay.css";
import DeleteTask from "./DeleteTask";
import { fetchTaskUpdate } from "../../features/task/taskAPI";
import { useDispatch } from "react-redux";
import { tasksSlice } from "../../features/user/databaseSlice";

function DefaultTaskDisplay(props) {
    const {taskStatus, taskTimeDeadline, projectName, taskName, taskImportant} = props.task;
    const [currentStatus, setCurrentStatus] = useState(taskStatus);
    const [taskInfoDisplay, setTaskInfoDisplay] = useState('none');
    const [currentImportant, setCurrentImportant] = useState(taskImportant);
    const accountName = localStorage.getItem("accountName");
    const dispatch = useDispatch();

    const onChangeTaskStatus = (event) => {       
        const newStatus = nextStatus(taskStatus);
        setCurrentStatus(newStatus);
        const task = {taskName, projectName, accountName, currentImportant};
        fetchTaskUpdate(task, newStatus)
        .then((response) => {
            dispatch(tasksSlice.actions.changeStatus({taskName, projectName, newStatus}));
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const onChangeTaskInfoDisplay = () => {
        if (taskInfoDisplay === 'none') setTaskInfoDisplay('block');
        else setTaskInfoDisplay('none');
    };

    const onClickImportant = () => {
        const newImportantStatus = !currentImportant;
        const task = {taskName, projectName, accountName, newImportantStatus};

        setCurrentImportant(newImportantStatus);
        fetchTaskUpdate(task, "important")
        .then((response) => {
            dispatch(tasksSlice.actions.changeImportant({taskName, projectName, newImportantStatus}));
        })
        .catch((err) => {
            console.log(err);
        });
        
    }

    if (props.type === 'dashboard') {
        return (
            <li>
                <h4>{taskName}/{projectName}</h4>
                <p>{currentStatus}</p>
                <p>Deadline: {timeDisplay(taskTimeDeadline)}</p>
                <div className={`${currentStatus} checkbox`} onClick={onChangeTaskStatus}></div>
                <p>Important</p>
                <div className={`${currentImportant}_star important`} onClick={onClickImportant}></div>
                <button onClick={onChangeTaskInfoDisplay}>Task Information</button>
                <TaskInfo task={props.task} display={taskInfoDisplay} type="dashboard"/>
            </li>
        )
    }
    return (
        <li>
            <h4>{taskName}</h4>
            <p>{currentStatus}</p>
            <p>Deadline: {timeDisplay(taskTimeDeadline)}</p>
            <div className={`${currentStatus} checkbox`} onClick={onChangeTaskStatus}></div>
            <p>Important</p>
            <div className={`${currentImportant}_star important`} onClick={onClickImportant}></div>
            <button onClick={onChangeTaskInfoDisplay}>Task Information</button>
            <TaskInfo task={props.task} display={taskInfoDisplay}/>
        </li>
    )
}

function timeDisplay(time) {
    return time.slice(0, 10);
}

function TaskInfo(props) {
    const {taskTimeDeadline, taskTimeCreated, taskDescription, taskName, projectName} = props.task;

    if (props.type === "dashboard") {
        return (
            <div className="taskInfo" style={{display: props.display}}>
                <p>Task description: {taskDescription}</p>
                <p>Deadline: {timeDisplay(taskTimeDeadline)}</p>
                <p>Time create: {timeDisplay(taskTimeCreated)}</p>
                <p>Project name: {projectName}</p>
                <DeleteTask task={props.task} taskName={taskName}/>
            </div>
        );
    }
    return (
        <div className="taskInfo" style={{display: props.display}}>
            <p>Task description: {taskDescription}</p>
            <p>Deadline: {timeDisplay(taskTimeDeadline)}</p>
            <p>Time create: {timeDisplay(taskTimeCreated)}</p>
            <DeleteTask task={props.task} taskName={taskName}/>
        </div>
    )
}

function nextStatus(currentStatus) {
    if (currentStatus === 'pending') return 'fulfilled';
    else return 'pending';
}

export { DefaultTaskDisplay }