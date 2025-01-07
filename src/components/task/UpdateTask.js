import { useState } from "react";
import { featchTaskUpdateInfo } from "../../features/task/taskAPI";
import { useDispatch } from "react-redux";
import { tasksSlice } from "../../features/user/databaseSlice";
import './UpdateTask.css';

function UpdateTask(props) {
    const { task, display, setEditDisplay, setTaskDetailDisplay } = props;
    const { taskName, taskDescription, taskTimeDeadline, taskTimeCreated, projectName} = task;
    const [newTaskName, setNewTaskName] = useState(taskName);
    const [newTaskDescription, setNewTaskDescription] = useState(taskDescription);
    const [newTaskTimeDeadline, setNewTaskTimeDeadline] = useState(taskTimeDeadline);

    const accountName = localStorage.getItem('accountName');
    const dispatch = useDispatch();

    const onClickCancle = () => { setEditDisplay(false); setTaskDetailDisplay(false);}
    const onChangeTaskName = event => { setNewTaskName(event.target.value); }
    const onChangeTaskDescription = event => { setNewTaskDescription(event.target.value); }
    const onChangeTaskDeadline = event => { setNewTaskTimeDeadline(event.target.value); }

    const today = new Date();
    today.setDate(today.getDate());
    const todayString = today.toISOString().slice(0, 10);

    const onSubmitUpdateTaskInfo = (event) => {
        event.preventDefault();
        featchTaskUpdateInfo(taskName, projectName, accountName, newTaskName, newTaskDescription, newTaskTimeDeadline)
        .then(response => {
            if (!response.error) {
                dispatch(tasksSlice.actions.updateInfo({taskName, projectName, accountName, newTaskName, newTaskDescription, newTaskTimeDeadline}));
                setEditDisplay(false);
                setTaskDetailDisplay(false);
            }
            else {
                alert(response.message)
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    return (
        <div className="editTaskForm" style={{display: display}} onSubmit={onSubmitUpdateTaskInfo}>
            <form className="editTaskFormMain">
                <div>
                    <label htmlFor={`${taskName}_${projectName}_newTaskName`}>Task name: </label>
                    <input type="text" name={`${taskName}_${projectName}_newTaskName`} id={`${taskName}_${projectName}_newTaskName`} value={newTaskName} onChange={onChangeTaskName}/>
                </div>
                <div>
                    <label htmlFor={`${taskName}_${projectName}_newTaskDescription`}>Task description: </label>
                    <input type="text" name={`${taskName}_${projectName}_newTaskDescription`} id={`${taskName}_${projectName}_newTaskDescription`} value={newTaskDescription} onChange={onChangeTaskDescription}/>
                </div>
                <p><span>Task time created:</span> {taskTimeCreated}</p>
                <div>
                    <label htmlFor={`${taskName}_${projectName}_newTaskDeadline`}>Task deadline: </label>
                    <input type="date" name={`${taskName}_${projectName}_newTaskDeadline`} id={`${taskName}_${projectName}_newTaskDeadline`} value={newTaskTimeDeadline} onChange={onChangeTaskDeadline} min={todayString}/>
                </div>
                <p><span>Task's project name:</span> {projectName}</p>
                <p className="notice">&#9432; Cannot change task time created and task's project</p>
                <div className="editTaskButton">
                    <div className="editTaskSubmitButton">
                        <input type="submit" name={`editTaskSubmitButton_${taskName}_${projectName}`} id={`editTaskSubmitButton_${taskName}_${projectName}`} onClick={onClickCancle}/>
                        <label htmlFor={`editTaskSubmitButton_${taskName}_${projectName}`}><span>Apply</span></label>
                    </div>
                    <div className="editTaskCancelButton">
                        <input type="button" name={`editTaskCancelButton_${taskName}_${projectName}`} id={`editTaskCancelButton_${taskName}_${projectName}`} onClick={onClickCancle}/>
                        <label htmlFor={`editTaskCancelButton_${taskName}_${projectName}`}><span>Cancel</span></label>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default UpdateTask;