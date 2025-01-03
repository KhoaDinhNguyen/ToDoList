import { useState } from "react";
import "./taskDisplay.css";
import DeleteTask from "./DeleteTask";
import { fetchTaskUpdate } from "../../features/task/taskAPI";
import { useDispatch } from "react-redux";
import { tasksSlice } from "../../features/user/databaseSlice";
import UpdateTask from "./UpdateTask";
import { convertFromBooleanToDisplay } from "../../app/user/User";
import editImg from '../../img/user/edit.png';
import deleteImg from '../../img/user/delete.png';
import arrowUp from '../../img/user/uparrow.png';
import { convertDateToISOString } from "../../app/user/User";

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
    const todayString = convertDateToISOString(today);

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
        setDeleteDisplay(false);
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

    if (type === 'calendar') {
        return (
            <TaskDisplayCalendar
                task={props.task} 
                onChangeTaskDetailDisplay={onChangeTaskDetailDisplay} 
                currentStatus={currentStatus}
                taskDetailDisplay={taskDetailDisplay}
                currentImportant={currentImportant}
                onClickImportant={onClickImportant}
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
    const { taskName, taskTimeDeadline, projectName} = task;

    if (finish) {
        return (
            <li className={`homepageTask ${!taskDetailDisplay ? `${currentStatus}Task` : "homepageTaskDescription"}`}>
                <div className={!taskDetailDisplay ? "homepageTaskMain" : "homepageTaskMainNonDisplay"}>
                    <div className="important">
                        <input type="checkbox" id={`${taskName}_${projectName}_important`} name={`${taskName}_${projectName}_important`} checked={currentImportant} onChange={onClickImportant}/>
                        <label htmlFor={`${taskName}_${projectName}_important`}>
                            <svg viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                            </svg>
                        </label>
                    </div>            
                    <div className="homepageTaskName" onClick={onChangeTaskDetailDisplay}>
                        <h4>{taskName}</h4>
                    </div>
                </div>
                <TaskInfoHomepage 
                    task={task} 
                    finish={true} 
                    taskDetailDisplay={taskDetailDisplay} 
                    deleteDisplay={deleteDisplay} 
                    setDeleteDisplay={setDeleteDisplay} 
                    editDisplay={editDisplay} 
                    setEditDisplay={setEditDisplay}
                    onChangeTaskDetailDisplay={onChangeTaskDetailDisplay}
                />
            </li>
        )
    }

    return (
        <li className={`homepageTask ${!taskDetailDisplay ? `` : "homepageTaskDescription"}`}>
            <div className={!taskDetailDisplay ? "homepageTaskMain" : "homepageTaskMainNonDisplay"}>
                <div className="important">
                    <input type="checkbox" id={`${taskName}_${projectName}_important`} name={`${taskName}_${projectName}_important`} checked={currentImportant} onChange={onClickImportant}/>
                    <label htmlFor={`${taskName}_${projectName}_important`}>
                        <svg viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                        </svg>
                    </label>
                </div>            
                <div className="homepageTaskName" onClick={onChangeTaskDetailDisplay}>
                    <h4>{taskName}</h4>
                    <p className="deadline">Deadline: {taskTimeDeadline.slice(0, 10)}</p>
                </div>
                <div className="taskFunction">
                    <input type="checkbox" name={`${taskName}_${projectName}_Fulfilled`} id={`${taskName}_${projectName}_Fulfilled`} className="changeStatus" onChange={onChangeTaskStatus} checked={currentStatus === 'pending' ? false : true}/>
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
                onChangeTaskDetailDisplay={onChangeTaskDetailDisplay}
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
        setEditDisplay,
        onChangeTaskDetailDisplay
    } = props; 

    const { taskTimeDeadline, taskTimeCreated, taskDescription, taskName, taskStatus} = task;
    const onClickEdit = () => { setEditDisplay(true) };
    const onClickDelete = () => { setDeleteDisplay(true); };

    if (finish) {
        return (
            <div className={`taskInfoBody ${taskDetailDisplay ? "taskInfoVisible": "taskInfoHidden"}`}>
            <div className="taskInfoDescription">
                <div>
                    <span className="outlineDescription">Task name: </span>
                    <span>{taskName}</span>
                </div>
                <div>
                    <span className="outlineDescription">Task description:</span>
                    <span>{taskDescription}</span>
                </div>
                <div>
                    <span className="outlineDescription">Task time created:</span>
                    <span>{taskTimeCreated}</span>
                </div>
                <div>
                    <span className="outlineDescription">Task time deadline:</span>
                    <span>{taskTimeDeadline.slice(0, 10)}</span>
                </div>
                <div>
                    <span className="outlineDescription">Task status:</span>
                    <span>{taskStatus}</span>
                </div>
                <div>
                    <span className="note">&#9432; Cannot edit or delete finised task</span>
                </div>
            </div>
            <div className="taskInfoButton taskFinishInfoButton">
                <div onClick={onChangeTaskDetailDisplay} style={{display: convertFromBooleanToDisplay(!editDisplay && !deleteDisplay)}} className="taskInfoClose">
                    <figure>
                        <img src={arrowUp} alt="Close"/>
                        <figcaption>Close</figcaption>
                    </figure>
                </div>
            </div>
        </div>
        )
    }
    return (
        <div className={`taskInfoBody ${taskDetailDisplay ? "taskInfoVisible": "taskInfoHidden"} ${deleteDisplay ? "backgroundTaskDelete" : "backgroundTaskNonDelete"}`}>
            <div className="taskInfoDescription" style={{display: convertFromBooleanToDisplay(!editDisplay && !deleteDisplay)}}>
                <div>
                    <span className="outlineDescription">Task name: </span>
                    <span>{taskName}</span>
                </div>
                <div>
                    <span className="outlineDescription">Task description:</span>
                    <span>{taskDescription}</span>
                </div>
                <div>
                    <span className="outlineDescription">Task time created:</span>
                    <span>{taskTimeCreated}</span>
                </div>
                <div>
                    <span className="outlineDescription">Task time deadline:</span>
                    <span>{taskTimeDeadline.slice(0, 10)}</span>
                </div>
                <div>
                    <span className="outlineDescription">Task status:</span>
                    <span>{taskStatus}</span>
                </div>
            </div>
            <UpdateTask task={task} display={convertFromBooleanToDisplay(editDisplay)} setEditDisplay={setEditDisplay}/>
            <DeleteTask task={task} display={convertFromBooleanToDisplay(deleteDisplay)} setDeleteDisplay={setDeleteDisplay}/>
            <div className="taskInfoButton">
                <div onClick={onClickEdit} style={{display: convertFromBooleanToDisplay(!editDisplay && !deleteDisplay)}} className="taskInfoEdit">
                    <figure>
                        <img src={editImg} alt="edit"/>
                        <figcaption>Edit</figcaption>
                    </figure>
                </div>
                <div onClick={onClickDelete} style={{display: convertFromBooleanToDisplay(!editDisplay && !deleteDisplay)}} className="taskInfoDelete">
                    <figure>
                        <img src={deleteImg} alt="delete"/>
                        <figcaption>Delete</figcaption>
                    </figure>
                </div>
                <div onClick={onChangeTaskDetailDisplay} style={{display: convertFromBooleanToDisplay(!editDisplay && !deleteDisplay)}} className="taskInfoClose">
                    <figure>
                        <img src={arrowUp} alt="Close"/>
                        <figcaption>Close</figcaption>
                    </figure>
                </div>
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
    console.log(taskDetailDisplay);
    if (finish) {
        return (
            <li>
                <div className={`taskDashboard ${currentStatus}Task`}>
                    <div className="important">
                        <input type="checkbox" id={`${projectName}_${taskName}_important`} name={`${projectName}_${taskName}_important`} checked={currentImportant} onChange={onClickImportant}/>
                        <label htmlFor={`${projectName}_${taskName}_important`}>
                            <svg viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="taskName" onClick={onChangeTaskDetailDisplay}>
                        <h4>{taskName} -- Project name: {projectName}</h4>
                    </div>
                    <div className="taskFunction">
                    </div>
                </div>
                <TaskInfoDashboard task={task} taskDetailDisplay={taskDetailDisplay}/>
            </li>
        );
    }
    return (
        <li>
            <div className="taskDashboard">
                <div className="important">
                    <input type="checkbox" id={`${projectName}_${taskName}_important`} name={`${projectName}_${taskName}_important`} checked={currentImportant} onChange={onClickImportant}/>
                    <label htmlFor={`${projectName}_${taskName}_important`}>
                        <svg viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                        </svg>
                    </label>
                </div>
                <div className="taskName" onClick={onChangeTaskDetailDisplay}>
                    <h4>{taskName} -- Project name: {projectName}</h4>
                </div>
                <div className="taskFunction">
                    <input type="checkbox" name={`${projectName}_${taskName}Fulfilled`} id={`${projectName}_${taskName}Fulfilled`} className="changeStatus" onChange={onChangeTaskStatus} checked={currentStatus === 'pending' ? false : true}/>
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
function TaskDisplayCalendar(props) {
    const { task, onChangeTaskDetailDisplay, currentStatus, taskDetailDisplay, currentImportant, onClickImportant} = props;
    const { taskName, projectName } = task;

    return (
        <li className="dateDetail">
            <div className="taskCalendarBody">
                <div className="taskCalendarMain">
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
                    <div className="taskStatus">
                        <div className={`${currentStatus} checkbox`}></div>
                        <p>{currentStatus}</p>
                    </div>
                </div>
                <button onClick={onChangeTaskDetailDisplay} className="taskInfoDisplayButton">&#9776;</button>
            </div>
            <TaskInfoCalender task={task} taskDetailDisplay={taskDetailDisplay}/>
        </li>
    );
}

function TaskInfoCalender(props) {
    const { taskDetailDisplay, task } = props; 
    const { taskTimeCreated, taskDescription, projectName, taskName, taskTimeDeadline, taskStatus } = task;

    return (
        <div className={`taskCalendarDescription taskInfoBody ${taskDetailDisplay ? "taskInfoVisible": "taskInfoHidden"}`}>
            <p><span>Task name: </span>{taskName}</p>
            <p><span>Task description: </span>{taskDescription}</p>
            <p><span>Task status: </span>{taskStatus}</p>
            <p><span>Task time created: </span>{taskTimeCreated}</p>
            <p><span>Deadline: </span>{taskTimeDeadline.slice(0, 10)}</p>
            <p><span>Project name: </span>{projectName}</p>
        </div>
    );
}

export { 
    TaskDisplay,
    dateDisplay
 }
