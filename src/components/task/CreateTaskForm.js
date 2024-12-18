import { useState } from "react";
import { useDispatch } from "react-redux";
import { tasksSlice } from "../../features/user/databaseSlice";
import { fetchTaskCreate } from "../../features/task/taskAPI";
import './CreateTask.css';
import { convertFromBooleanToDisplay } from "../../app/user/User";

function CreateTaskForm(props) {
    const dispatch = useDispatch();
    const { projectName } = props;
    const accountName = localStorage.getItem('accountName');
    const currentDate = new Date().toJSON().slice(0, 10);

    const [createTaskFormDisplay, setCreateTaskFormDisplay] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskTimeDeadline, setTimeDeadline] = useState("");

    const onChangeTaskName = event => { setTaskName(event.target.value); }    
    const onChangeTaskDescription = event => { setTaskDescription(event.target.value); }
    const onChangeTaskDeadline = event => { setTimeDeadline(event.target.value); }
    const onClickToggleCreateTaskButton = () => { setCreateTaskFormDisplay(!createTaskFormDisplay); };

    const onSubmit = event => {
        event.preventDefault();
        try {
            fetchTaskCreate(accountName, projectName, taskName, taskDescription, taskTimeDeadline)
            .then(response => {
                alert(response.message);
                if (!response.error) {
                    dispatch(tasksSlice.actions.add({
                        taskName,
                        taskStatus: 'pending',
                        taskDescription,
                        taskTimeCreated: currentDate,
                        taskTimeDeadline,
                        projectName
                    }));
                    setTaskName("");
                    setTaskDescription("");
                    setTimeDeadline("");
                    setCreateTaskFormDisplay(false);
                }
            })
            .catch(response => {console.log(response.message)});
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="createTaskForm">
            <div className="openCreateTask" style={{display: convertFromBooleanToDisplay(!createTaskFormDisplay)}}>
                <button onClick={onClickToggleCreateTaskButton}>&#x1F7A3; Create new task</button>
            </div>
            <form style={{display: convertFromBooleanToDisplay(createTaskFormDisplay)}} onSubmit={onSubmit}>
                <div className="createTaskInput">
                    <label htmlFor={`${projectName}_taskName`}>Task name: </label>
                    <input type="text" id={`${projectName}_taskName`} name={`${projectName}_taskName`} required value={taskName} onChange={onChangeTaskName} autoComplete="off"/>
                </div>
                <div className="createTaskInput">
                    <label htmlFor={`${projectName}_taskDescription`}>Task description: </label>
                    <input type="text" id={`${projectName}_taskDescription`} name={`${projectName}_taskDescription`} value={taskDescription} onChange={onChangeTaskDescription} autoComplete="off"/>
                </div>             
                <div className="createTaskInput">
                    <label htmlFor={`${projectName}_taskTimeDeadline`}>Task deadline: </label>
                    <input type="date" id={`${projectName}_taskTimeDeadline`} name={`${projectName}_taskTimeDeadline`} value={taskTimeDeadline} onChange={onChangeTaskDeadline} min={currentDate} required/>
                </div>
                <div className="createTaskInput">
                    <p><span>Project name:</span> {projectName}</p>
                </div>
                <div className="createTaskButton">
                    <input type="submit" value="Create task"/>
                    <input type="button" value="Cancel" onClick={onClickToggleCreateTaskButton}/>
                </div>

            </form>
        </div>
    )   
}

export default CreateTaskForm;