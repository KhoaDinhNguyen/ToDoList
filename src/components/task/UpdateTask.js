import { useState } from "react";
import { featchTaskUpdateInfo } from "../../features/task/taskAPI";
import { useDispatch } from "react-redux";
import { tasksSlice } from "../../features/user/databaseSlice";

function UpdateTask(props) {
    const { task, setDisplayEdit, display } = props;
    const { taskName, taskDescription, taskTimeDeadline, taskTimeCreated, projectName} = task;
    const [newTaskName, setNewTaskName] = useState(taskName);
    const [newTaskDescription, setNewTaskDescription] = useState(taskDescription);
    const [newTaskTimeDeadline, setNewTaskTimeDeadline] = useState(taskTimeDeadline);
    const accountName = localStorage.getItem('accountName');
    const dispatch = useDispatch();

    const onClickCancle = () => { setDisplayEdit('none'); }
    const onChangeTaskName = event => { setNewTaskName(event.target.value); }
    const onChangeTaskDescription = event => { setNewTaskDescription(event.target.value); }
    const onChangeTaskDeadline = event => { setNewTaskTimeDeadline(event.target.value); }

    const onSubmitUpdateTaskInfo = (event) => {
        event.preventDefault();
        featchTaskUpdateInfo(taskName, projectName, accountName, newTaskName, newTaskDescription, newTaskTimeDeadline)
        .then(response => {
            dispatch(tasksSlice.actions.updateInfo({taskName, projectName, accountName, newTaskName, newTaskDescription, newTaskTimeDeadline}));
        })
        .catch(err => {
            console.log(err);
        });
    }
    return (
        <>  
            <div className="editForm" style={{display: display}} onSubmit={onSubmitUpdateTaskInfo}>
                <form>
                    <label htmlFor="newTaskName">Task name: </label>
                    <input type="text" name="newTaskName" id="newTaskName" value={newTaskName} onChange={onChangeTaskName}/>
                    <br/>
                    <label htmlFor="newTaskDescription">Task description: </label>
                    <input type="text" name="newTaskDescription" id="newTaskDescription" value={newTaskDescription} onChange={onChangeTaskDescription}/>
                    <br/>
                    <label htmlFor="newTaskTimeDeadline">Task deadline: </label>
                    <input type="date" name="newTaskTimeDeadline" id="newTaskTimeDeadline" value={newTaskTimeDeadline} onChange={onChangeTaskDeadline}/>
                    <br/>
                    <span>Task time created: {taskTimeCreated}</span>
                    <br/>
                    <span>Task's project name: {projectName}</span>
                    <br/>
                    <input type="submit" value="Confirm"/>
                    <button onClick={onClickCancle}>Cancle</button>
                </form>
                <p>Cannot change task time created and task's project</p>
            </div>
        </>
    )

}

export default UpdateTask;