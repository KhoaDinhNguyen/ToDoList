import { useState } from "react";
import "./taskDisplay.css";
import DeleteTask from "./DeleteTask";
import { fetchTaskUpdate } from "../../features/task/taskAPI";
import { useDispatch } from "react-redux";
import { tasksSlice } from "../../features/user/databaseSlice";
import UpdateTask from "./UpdateTask";
import { convertFromBooleanToDisplay } from "../../app/user/User";

function TaskDisplay(props) {
    const { type, task } = props;
    const {taskStatus, projectName, taskName, taskImportant, taskTimeDeadline} = task;
    const [currentStatus, setCurrentStatus] = useState(taskStatus);
    const [taskDetailDisplay, setTaskDetailDisplay] = useState(false);
    const [currentImportant, setCurrentImportant] = useState(taskImportant);
    const accountName = localStorage.getItem("accountName");
    const [deleteDisplay, setDeleteDisplay] = useState(false);
    const [editDisplay, setEditDisplay] = useState(false);
    const dispatch = useDispatch();

    const today = new Date();
    const todayString = today.toISOString().slice(0, 10);

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

    const onChangeTaskDetailDisplay = () => {
        setEditDisplay(false);
        setTaskDetailDisplay(!taskDetailDisplay);
    };

    const onClickImportant = (event) => { 
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
                onChangeTaskDetailDisplay={onChangeTaskDetailDisplay} 
                currentStatus={currentStatus}
                taskDetailDisplay={taskDetailDisplay}
            />
        );
    }
    else if (type === 'dashboard') {
        return (
            <TaskDisplayDashBoard 
            task={props.task} 
            onChangeTaskStatus={onChangeTaskStatus}
            onClickImportant={onClickImportant} 
            onChangeTaskDetailDisplay={onChangeTaskDetailDisplay} 
            currentImportant={currentImportant} 
            currentStatus={currentStatus}
            taskDetailDisplay={taskDetailDisplay}
            finish={taskTimeDeadline < todayString}
            />
        );
    }

    return (
        <TaskDisplayHomepage 
            task={props.task} 
            onChangeTaskStatus={onChangeTaskStatus}
            onClickImportant={onClickImportant} 
            onChangeTaskDetailDisplay={onChangeTaskDetailDisplay}
            setDeleteDisplay={setDeleteDisplay}
            setEditDisplay={setEditDisplay}
            currentImportant={currentImportant} 
            currentStatus={currentStatus}
            finish={taskTimeDeadline < todayString}
            taskDetailDisplay={taskDetailDisplay}
            deleteDisplay={deleteDisplay}
            editDisplay={editDisplay}

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


/* -------------------- TASK HOMEPAGE IN HOMEPAGE--------------------*/
function TaskDisplayHomepage(props) {
    const { 
        task, 
        onChangeTaskStatus, 
        onClickImportant, 
        onChangeTaskDetailDisplay,
        setDeleteDisplay,
        setEditDisplay,
        currentImportant,
        currentStatus, 
        finish,
        taskDetailDisplay,
        deleteDisplay,
        editDisplay
    } = props;
    const { taskName, taskTimeDeadline} = task;

    if (finish) {
        return (
            <li className="homepageTask taskFinish">
                <div className={`${currentStatus}Task taskBody`}>
                    <div className="taskNameAndTaskStatus">
                        <div className="taskName">
                            <div className="important">
                                <input type="checkbox" id={`${taskName}_important`} name={`${taskName}_important`} checked={currentImportant} onChange={onClickImportant}/>
                                <label htmlFor={`${taskName}_important`}>
                                    <svg viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                    </svg>
                                </label>
                            </div>
                            <h4>{taskName}</h4>
                        </div>
                    </div>
                    <div className="taskFunction">
                        <p className="deadline">Deadline: {taskTimeDeadline.slice(0, 10)}</p>
                        <button onClick={onChangeTaskDetailDisplay} className="taskInfoDisplayButton">&#9776;</button>
                    </div>
                </div>
                <TaskInfoHomepage task={task} finish={true} taskDetailDisplay={taskDetailDisplay} deleteDisplay={deleteDisplay} setDeleteDisplay={setDeleteDisplay} editDisplay={editDisplay} setEditDisplay={setEditDisplay}/>
            </li>
        )
    }
    return (
        <li className="homepageTask">
            <div className="taskBody">
                <div className="taskNameAndTaskStatus">
                    <div className="taskName">
                        <div className="important">
                            <input type="checkbox" id={`${taskName}_important`} name={`${taskName}_important`} checked={currentImportant} onChange={onClickImportant}/>
                            <label htmlFor={`${taskName}_important`}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                </svg>
                            </label>
                        </div>
                        <h4>{taskName}</h4>
                    </div>
                    <div className="taskStatus">
                        <div className={`${currentStatus} checkbox`}></div>
                        <p>{currentStatus}</p>
                    </div>
                </div>
                <div className="taskFunction">
                    <p className="deadline">Deadline: {taskTimeDeadline.slice(0, 10)}</p>
                    <input type="checkbox" name={`${taskName}Fulfilled`} id={`${taskName}Fulfilled`} className="changeStatus" onChange={onChangeTaskStatus} checked={currentStatus === 'pending' ? false : true}/>
                    <button onClick={onChangeTaskDetailDisplay} className="taskInfoDisplayButton">&#9776;</button>
                </div>
            </div>
            <TaskInfoHomepage 
                task={task} 
                finish={false} 
                taskDetailDisplay={taskDetailDisplay} 
                deleteDisplay={deleteDisplay} 
                setDeleteDisplay={setDeleteDisplay} 
                editDisplay={editDisplay} 
                setEditDisplay={setEditDisplay}
            />
        </li>
    );
}

function TaskInfoHomepage(props) {
    const { 
        task, 
        finish, 
        taskDetailDisplay, 
        deleteDisplay, 
        setDeleteDisplay, 
        editDisplay, 
        setEditDisplay
    } = props; 

    const { taskTimeDeadline, taskTimeCreated, taskDescription, taskName, taskStatus} = task;
    const onClickEdit = () => { setEditDisplay(true) };
    const onClickDelete = () => { setDeleteDisplay(true); };

    if (finish) {
        return (
            <div className={`taskInfoBody ${taskDetailDisplay ? "taskInfoVisible": "taskInfoHidden"}`}>
            <div className="taskInfoDescription">
                <p><span>Task name:</span> {taskName}</p>
                <p><span>Task description:</span> {taskDescription}</p>
                <p><span>Task time created:</span> {taskTimeCreated}</p>
                <p><span>Task time deadline:</span> {taskTimeDeadline}</p>
                <p><span>Task status:</span> finished + {taskStatus}</p>
                <p className="note">&#9432; Cannot edit or delete finised task</p>
            </div>
        </div>
        )
    }
    return (
        <div className={`taskInfoBody ${taskDetailDisplay ? "taskInfoVisible": "taskInfoHidden"} ${!deleteDisplay ? "backgroundDelete" : "backgroundNonDelete"}`}>
            <div className="taskInfoDescription" style={{display: convertFromBooleanToDisplay(!editDisplay && !deleteDisplay)}}>
                <p><span>Task name:</span> {taskName}</p>
                <p><span>Task description:</span> {taskDescription}</p>
                <p><span>Task time created:</span> {taskTimeCreated}</p>
                <p><span>Task time deadline:</span> {taskTimeDeadline}</p>
            </div>
            <UpdateTask task={task} display={convertFromBooleanToDisplay(editDisplay)} setEditDisplay={setEditDisplay}/>
            <DeleteTask task={task} display={convertFromBooleanToDisplay(deleteDisplay)} setDeleteDisplay={setDeleteDisplay}/>
            <div className="taskInfoButton">
                <button onClick={onClickEdit} style={{display: convertFromBooleanToDisplay(!editDisplay && !deleteDisplay)}}>Edit</button>
                <button onClick={onClickDelete} style={{display: convertFromBooleanToDisplay(!editDisplay && !deleteDisplay)}}>Delete</button>
            </div>
        </div>
    )
}

/* -------------------- TASK DISPLAY IN DASHBOARD--------------------*/
function TaskDisplayDashBoard(props) {
    const { 
        task, 
        onChangeTaskStatus, 
        onClickImportant, 
        onChangeTaskDetailDisplay,
        currentImportant, 
        currentStatus,
        taskDetailDisplay,
        finish
    } = props;
    const { taskName, projectName} = task;

    if (finish) {
        return (
            <li>
                <div className={`taskDashboard ${currentStatus}Task`}>
                    <div className="taskName">
                        <div className="important">
                            <input type="checkbox" id={`${taskName}_important`} name={`${taskName}_important`} checked={currentImportant} onChange={onClickImportant}/>
                            <label htmlFor={`${taskName}_important`}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                </svg>
                            </label>
                        </div>
                        <h4>{taskName} -- Project name: {projectName}</h4>
                    </div>
                    <div className="taskFunction">
                        <button onClick={onChangeTaskDetailDisplay} className="taskInfoDisplayButton">&#9776;</button>  
                    </div>
                </div>
                <TaskInfoDashboard task={task} taskDetailDisplay={taskDetailDisplay}/>
            </li>
        );
    }
    return (
        <li>
            <div className="taskDashboard">
                <div className="taskName">
                    <div className="important">
                        <input type="checkbox" id={`${taskName}_important`} name={`${taskName}_important`} checked={currentImportant} onChange={onClickImportant}/>
                        <label htmlFor={`${taskName}_important`}>
                            <svg viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                            </svg>
                        </label>
                    </div>
                    <h4>{taskName} -- Project name: {projectName}</h4>
                </div>
                <div className="taskFunction">
                    <input type="checkbox" name={`${taskName}Fulfilled`} id={`${taskName}Fulfilled`} className="changeStatus" onChange={onChangeTaskStatus} checked={currentStatus === 'pending' ? false : true}/>
                    <button onClick={onChangeTaskDetailDisplay} className="taskInfoDisplayButton">&#9776;</button>  
                </div>
            </div>
            <TaskInfoDashboard task={task} taskDetailDisplay={taskDetailDisplay}/>
        </li>
    );
}

function TaskInfoDashboard(props) {
    const { task, taskDetailDisplay } = props;
    const { taskTimeDeadline, taskTimeCreated, taskDescription, projectName, taskName, taskStatus} = task;
    console.log(taskDetailDisplay);
    return (
        <div className={`taskInfoBody ${taskDetailDisplay ? "taskInfoVisible": "taskInfoHidden"}`}>
            <div>
                <p><span>Task name: </span>{taskName}</p>
                <p><span>Task description: </span>{taskDescription}</p>
                <div className="taskStatus">
                    <p><span>Task status: </span></p>
                    <div className={`${taskStatus} checkbox`}></div>
                    <p>{taskStatus}</p>
                </div>
                <p><span>Deadline: </span>{taskTimeDeadline.slice(0, 10)}</p>
                <p><span>Time created: </span>{taskTimeCreated}</p>
                <p><span>Project name: </span>{projectName}</p>
            </div>
        </div>
    );
}

/* -------------------- TASK DISPLAY IN CALENDER--------------------*/
function TaskDisplayCalender(props) {
    const { task, onChangeTaskDetailDisplay, currentStatus, taskDetailDisplay} = props;
    const { taskName, taskTimeDeadline, projectName } = task;

    return (
        <li>
            <h4>{taskName} - Project name : {projectName}</h4>
            <p>{currentStatus}</p>
            <p>Deadline: {taskTimeDeadline}</p>
            <button onClick={onChangeTaskDetailDisplay}>Task Information</button>
            <TaskInfoCalender task={task} display={convertFromBooleanToDisplay(taskDetailDisplay)}/>
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
