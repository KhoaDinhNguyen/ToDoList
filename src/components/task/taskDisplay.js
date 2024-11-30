import { useState } from "react";
import "./taskDisplay.css";
import DeleteTask from "./DeleteTask";
import { fetchTaskUpdate } from "../../features/task/taskAPI";
import { useDispatch } from "react-redux";
import { tasksSlice } from "../../features/user/databaseSlice";
import UpdateTask from "./UpdateTask";

function TaskDisplay(props) {
    const { type, task} = props;
    const {taskStatus, projectName, taskName, taskImportant} = task;
    const [currentStatus, setCurrentStatus] = useState(taskStatus);
    const [taskInfoDisplay, setTaskInfoDisplay] = useState('none');
    const [currentImportant, setCurrentImportant] = useState(taskImportant);
    const accountName = localStorage.getItem("accountName");
    const [displayEdit, setDisplayEdit] = useState('none');
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
        setDisplayEdit('none');
        if (taskInfoDisplay === 'none') { setTaskInfoDisplay('block'); }
        else { setTaskInfoDisplay('none'); }
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

    if (type === 'calender') {
        return (
            <TaskDisplayCalender
                task={props.task} 
                onChangeTaskInfoDisplay={onChangeTaskInfoDisplay} 
                currentStatus={currentStatus}
                taskInfoDisplay={taskInfoDisplay}
            />
        );
    }
    else if (type === 'dashboard') {
        return (
            <TaskDisplayDashBoard 
            task={props.task} 
            onChangeTaskStatus={onChangeTaskStatus}
            onClickImportant={onClickImportant} 
            onChangeTaskInfoDisplay={onChangeTaskInfoDisplay} 
            currentImportant={currentImportant} 
            currentStatus={currentStatus}
            taskInfoDisplay={taskInfoDisplay}
            />
        );
    }

    return (
        <TaskDisplayHomepage 
            task={props.task} 
            onChangeTaskStatus={onChangeTaskStatus}
            onClickImportant={onClickImportant} 
            onChangeTaskInfoDisplay={onChangeTaskInfoDisplay}
            setDisplayEdit={setDisplayEdit} 
            currentImportant={currentImportant} 
            currentStatus={currentStatus}
            taskInfoDisplay={taskInfoDisplay}
            displayEdit={displayEdit}
        />
    );
}

function dateDisplay(date) {
    const dateString = date.toISOString().slice(0, 10);
    return dateString;
}

function nextStatus(currentStatus) {
    if (currentStatus === 'pending') return 'fulfilled';
    else return 'pending';
}

function negateDisplay(display) {
    if (display === 'block') return 'none';
    else return 'block';
}


/* -------------------- TASK HOMEPAGE IN DASHBOARD--------------------*/
function TaskDisplayHomepage(props) {
    const { task, onChangeTaskStatus, onClickImportant, onChangeTaskInfoDisplay, currentStatus, currentImportant, taskInfoDisplay, setDisplayEdit, displayEdit} = props;
    const { taskName, taskTimeDeadline} = task;

    return (
        <li>
            <h4>{taskName}</h4>
            <p>{currentStatus}</p>
            <p>Deadline: {taskTimeDeadline}</p>
            <div className={`${currentStatus} checkbox`} onClick={onChangeTaskStatus}></div>
            <p>Important</p>
            <div className={`${currentImportant}_star important`} onClick={onClickImportant}></div>
            <button onClick={onChangeTaskInfoDisplay}>Task Information</button>
            <TaskInfoHomepage task={task} display={taskInfoDisplay} displayEdit={displayEdit} setDisplayEdit={setDisplayEdit}/>
        </li>
    );
}

function TaskInfoHomepage(props) {
    const { display, task, displayEdit, setDisplayEdit } = props; 
    const {taskTimeDeadline, taskTimeCreated, taskDescription} = task;

    const onClickEdit = () => {
        setDisplayEdit('block');
    }

    return (
        <div className="taskInfo" style={{display: display}}>
            <div style={{display: negateDisplay(displayEdit)}}>
                <p>Task description: {taskDescription}</p>
                <p>Deadline: {taskTimeDeadline}</p>
                <p>Time created: {taskTimeCreated}</p>
            </div>
            <UpdateTask task={task} display={displayEdit} setDisplayEdit={setDisplayEdit}/>
            <button onClick={onClickEdit}>Edit</button>
            <DeleteTask task={task}/>
        </div>
    )
}

/* -------------------- TASK DISPLAY IN DASHBOARD--------------------*/
function TaskDisplayDashBoard(props) {
    const { task, onChangeTaskStatus, onClickImportant, onChangeTaskInfoDisplay, currentStatus, currentImportant, taskInfoDisplay} = props;
    const { taskName, projectName} = task;

    return (
        <li>
            <h4>{taskName}/{projectName}</h4>
            <p>{currentStatus}</p>
            <div className={`${currentStatus} checkbox`} onClick={onChangeTaskStatus}></div>
            <p>Important</p>
            <div className={`${currentImportant}_star important`} onClick={onClickImportant}></div>
            <button onClick={onChangeTaskInfoDisplay}>Task Information</button>
            <TaskInfoDashboard task={task} display={taskInfoDisplay}/>
        </li>
    );
}

function TaskInfoDashboard(props) {
    const { display, task } = props;
    const {taskTimeDeadline, taskTimeCreated, taskDescription, projectName} = task;

    return (
        <div className="taskInfo" style={{display: display}}>
            <p>Task description: {taskDescription}</p>
            <p>Deadline: {taskTimeDeadline}</p>
            <p>Time created: {taskTimeCreated}</p>
            <p>Project name: {projectName}</p>
        </div>
    );
}

/* -------------------- TASK DISPLAY IN CALENDER--------------------*/
function TaskDisplayCalender(props) {
    const { task, onChangeTaskInfoDisplay, currentStatus, taskInfoDisplay} = props;
    const { taskName, taskTimeDeadline, projectName } = task;

    return (
        <li>
            <h4>{taskName} - Project name : {projectName}</h4>
            <p>{currentStatus}</p>
            <p>Deadline: {taskTimeDeadline}</p>
            <button onClick={onChangeTaskInfoDisplay}>Task Information</button>
            <TaskInfoCalender task={task} display={taskInfoDisplay}/>
        </li>
    );
}

function TaskInfoCalender(props) {
    const { display, task } = props; 
    const { taskTimeCreated, taskDescription } = task;

    return (
        <div className="taskInfo" style={{display: display}}>
            <p>Task description: {taskDescription}</p>
            <p>Time created: {taskTimeCreated}</p>
        </div>
    );
}

export { 
    TaskDisplay,
    dateDisplay
 }