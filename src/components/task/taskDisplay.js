import { useState } from "react";
import "./taskDisplay.css";
import DeleteTask from "./DeleteTask";
import { fetchTaskUpdate } from "../../features/task/taskAPI";
import { useDispatch } from "react-redux";
import { tasksSlice } from "../../features/user/databaseSlice";
import UpdateTask from "./UpdateTask";
import { convertFromBooleanToDisplay } from "../../app/user/User";
import { convertDateToISOString } from "../../app/user/User";
import informationLogo from '../../img/user/informationDisplay.png';
import editLogo from '../../img/user/editDisplay.png';
import deleteLogo from '../../img/user/deleteDisplay.png';

function TaskDisplay(props) {
    const { type, task } = props;
    const {taskStatus, projectName, taskName, taskImportant, taskTimeDeadline} = task;
    const [currentStatus, setCurrentStatus] = useState(taskStatus);
    const [taskDetailDisplay, setTaskDetailDisplay] = useState(false);
    const [currentImportant, setCurrentImportant] = useState(taskImportant);
    const accountName = localStorage.getItem("accountName");
    const [deleteDisplay, setDeleteDisplay] = useState(false);
    const [editDisplay, setEditDisplay] = useState(false);
    const [taskDescriptionDisplay, setTaskDescriptionDisplay] = useState(false);

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

    const onClickInfo = () => {
        if (taskDetailDisplay === true && taskDescriptionDisplay === true) {
            setTaskDescriptionDisplay(false);
            setTaskDetailDisplay(false);
            return;
        }
        else if (taskDetailDisplay === false) {
            setTaskDetailDisplay(true);
        }
        setTaskDescriptionDisplay(true);
        setEditDisplay(false);
        setDeleteDisplay(false);
    }
    const onClickEdit = () => {
        if (taskDetailDisplay === true && editDisplay === true) {
            setEditDisplay(false);
            setTaskDetailDisplay(false);
            return;
        }
        else if (taskDetailDisplay === false) {
            setTaskDetailDisplay(true);
        }
        setEditDisplay(true);
        setTaskDescriptionDisplay(false);
        setDeleteDisplay(false);
    }

    const onClickDelete = () => {
        if (taskDetailDisplay === true && deleteDisplay === true) {
            setDeleteDisplay(false);
            setTaskDetailDisplay(false);
            return;
        }
        else if (taskDetailDisplay === false) {
            setTaskDetailDisplay(true);
        }
        setDeleteDisplay(true);
        setTaskDescriptionDisplay(false);
        setEditDisplay(false);
    }

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
            today={props.today}
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
            taskDescriptionDisplay={taskDescriptionDisplay}
            onClickInfo={onClickInfo}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            setTaskDetailDisplay={setTaskDetailDisplay}
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
        editDisplay,
        taskDescriptionDisplay,
        onClickEdit,
        onClickInfo,
        onClickDelete,
        setTaskDetailDisplay
    } = props;
    const { taskName, taskTimeDeadline, projectName} = task;

    if (finish) {
        return (
            <li className={`homepageTask ${!taskDetailDisplay ? `` : "homepageTaskDescription"}`}>
                <div className="importantAndCheckBox">
                </div>
                <div className="homepageTaskName">
                    <div className="important">
                        <input type="checkbox" id={`${taskName}_${projectName}_important`} name={`${taskName}_${projectName}_important`} checked={currentImportant} onChange={onClickImportant}/>
                        <label htmlFor={`${taskName}_${projectName}_important`}>
                            <svg viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                            </svg>
                        </label>
                    </div>    
                    <h4>{taskName}</h4>
                </div>
                <div className={`homepageStatus ${currentStatus}_Task`}>
                    <p>{currentStatus}</p>
                </div>
                <div className="taskFunction">
                    <img src={informationLogo} alt="Info" title="Info" onClick={onClickInfo}/>
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
                    taskDescriptionDisplay={taskDescriptionDisplay}
                />
            </li>
        )
    }

    return (
        <li className={`homepageTask ${!taskDetailDisplay ? `` : "homepageTaskDescription"}`}>
            <div className="importantAndCheckBox">
                <input type="checkbox" name={`${taskName}_${projectName}_Fulfilled`} id={`${taskName}_${projectName}_Fulfilled`} className="changeStatus" onChange={onChangeTaskStatus} checked={currentStatus === 'pending' ? false : true}/>
                <label htmlFor={`${taskName}_${projectName}_Fulfilled`} className="labelCheckboxTask">
                    <svg width="20px" height="20px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M5 16.577l2.194-2.195 5.486 5.484L24.804 7.743 27 9.937l-14.32 14.32z"/></svg>
                </label>
            </div>
            <div className="homepageTaskName">
                <div className="important">
                    <input type="checkbox" id={`${taskName}_${projectName}_important`} name={`${taskName}_${projectName}_important`} checked={currentImportant} onChange={onClickImportant}/>
                    <label htmlFor={`${taskName}_${projectName}_important`}>
                        <svg viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                        </svg>
                    </label>
                </div>    
                <h4>{taskName}</h4>
            </div>
            <div className={`homepageStatus ${currentStatus}_Task`}>
                <p>{currentStatus}</p>
            </div>
            <div className="taskFunction">
                <img src={informationLogo} alt="Info" title="Info" onClick={onClickInfo}/>
                <img src={editLogo} alt="Edit" title="Edit" onClick={onClickEdit}/>
                <img src={deleteLogo} alt="Delete" title="Delete" onClick={onClickDelete}/>
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
                taskDescriptionDisplay={taskDescriptionDisplay}
                setTaskDetailDisplay={setTaskDetailDisplay}
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
        taskDescriptionDisplay,
        setTaskDetailDisplay
    } = props; 

    const { taskTimeDeadline, taskTimeCreated, taskDescription, taskName, taskStatus} = task;


    if (finish) {
        return (
            <div className={`taskInfoBody ${taskDetailDisplay ? "taskInfoVisible": "taskInfoHidden"}`}>
            <div className="taskInfoDescription" style={{display: convertFromBooleanToDisplay(taskDescriptionDisplay)}}>
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
        </div>
        )
    }
    return (
        <div className={`taskInfoBody ${taskDetailDisplay ? "taskInfoVisible": "taskInfoHidden"}`}>
            <div className="taskInfoDescription" style={{display: convertFromBooleanToDisplay(taskDescriptionDisplay)}}>
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
            <UpdateTask task={task} display={convertFromBooleanToDisplay(editDisplay)} setEditDisplay={setEditDisplay} setTaskDetailDisplay={setTaskDetailDisplay}/>
            <DeleteTask task={task} display={convertFromBooleanToDisplay(deleteDisplay)} setDeleteDisplay={setDeleteDisplay} setTaskDetailDisplay={setTaskDetailDisplay}/>
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
        finish,
        today
    } = props;
    const { taskName, projectName, taskTimeDeadline} = task;
    console.log(today);

    if (today) {
        return (
            <li>
                <div className='taskDashboard'>
                    <div className="taskDashboardFunction">
                        <input type="checkbox" name={`${projectName}_${taskName}Fulfilled`} id={`${projectName}_${taskName}Fulfilled`} className="changeStatus" onChange={onChangeTaskStatus} checked={currentStatus === 'pending' ? false : true}/>
                        <label htmlFor={`${projectName}_${taskName}Fulfilled`} className="labelCheckboxTask">
                            <svg width="20px" height="20px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M5 16.577l2.194-2.195 5.486 5.484L24.804 7.743 27 9.937l-14.32 14.32z"/></svg>
                        </label>
                        <div className="important">
                            <input type="checkbox" id={`${projectName}_${taskName}_important`} name={`${projectName}_${taskName}_important`} checked={currentImportant} onChange={onClickImportant}/>
                            <label htmlFor={`${projectName}_${taskName}_important`}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                </svg>
                            </label>
                        </div>
                   </div>
                   <div className="taskNameAndTaskDeadline" onClick={onChangeTaskDetailDisplay}>
                        <div className="taskName">
                            <h4>{taskName}</h4>
                        </div>
                        <div className="taskDeadline">

                        </div>
                   </div>
                </div>
                <TaskInfoDashboard task={task} taskDetailDisplay={taskDetailDisplay}/>
            </li>
        );
    }

    return (
        <li>
            <div className='taskDashboard'>
                <div className="taskDashboardFunction">
                    <input type="checkbox" name={`${projectName}_${taskName}Fulfilled`} id={`${projectName}_${taskName}Fulfilled`} className="changeStatus" onChange={onChangeTaskStatus} checked={currentStatus === 'pending' ? false : true}/>
                    <label htmlFor={`${projectName}_${taskName}Fulfilled`} className="labelCheckboxTask">
                        <svg width="20px" height="20px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M5 16.577l2.194-2.195 5.486 5.484L24.804 7.743 27 9.937l-14.32 14.32z"/></svg>
                    </label>
                    <div className="important">
                        <input type="checkbox" id={`${projectName}_${taskName}_important`} name={`${projectName}_${taskName}_important`} checked={currentImportant} onChange={onClickImportant}/>
                        <label htmlFor={`${projectName}_${taskName}_important`}>
                            <svg viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                            </svg>
                        </label>
                    </div>
                </div>
                   <div className="taskNameAndTaskDeadline" onClick={onChangeTaskDetailDisplay}>
                        <div className="taskName">
                            <h4>{taskName}</h4>
                        </div>
                        <div className="taskDeadline">
                            <p>{taskTimeDeadline}</p>
                        </div>
                   </div>
            </div>
            <TaskInfoDashboard task={task} taskDetailDisplay={taskDetailDisplay}/>
        </li>
    );
}

function TaskInfoDashboard(props) {
    const { task, taskDetailDisplay } = props;
    const { taskTimeDeadline, taskTimeCreated, taskDescription, projectName, taskName, taskStatus} = task;

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
