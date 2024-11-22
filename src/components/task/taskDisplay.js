import { useState } from "react";
import "./taskDisplay.css";
import DeleteTask from "./DeleteTask";
import { fetchTaskUpdate } from "../../features/task/taskAPI";

function DefaultTaskDisplay(props) {
    const {taskStatus, taskTimeDeadline, projectName, taskName} = props.task;
    const [currentStatus, setCurrentStatus] = useState(taskStatus);
    const [taskInfoDisplay, setTaskInfoDisplay] = useState('none');

    const accountName = localStorage.getItem("accountName");

    const onChangeTaskStatus = (event) => {
        const newStatus = nextStatus(currentStatus);
        setCurrentStatus(newStatus);
        props.task.taskStatus = newStatus;
        fetchTaskUpdate(accountName, taskName, projectName, newStatus)
        .then((response) => {
            
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const onChangeTaskInfoDisplay = () => {
        if (taskInfoDisplay === 'none' ) setTaskInfoDisplay('block');
        else setTaskInfoDisplay('none');
    };

    return (
        <li>
            <h4>{taskName}</h4>
            <p>{currentStatus}</p>
            <p>Deadline: {timeDisplay(taskTimeDeadline)}</p>
            <div className={`${currentStatus} checkbox`} onClick={onChangeTaskStatus}></div>
            <button onClick={onChangeTaskInfoDisplay}>Task Information</button>
            <TaskInfo task={props.task} display={taskInfoDisplay}/>
        </li>
    )
}

function timeDisplay(time) {
    return time.slice(0, 10);
}

function TaskInfo(props) {
    const {taskTimeDeadline, taskTimeCreated, taskDescription, taskName} = props.task;

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