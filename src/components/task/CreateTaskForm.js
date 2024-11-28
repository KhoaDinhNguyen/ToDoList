import { useState } from "react";
import { useDispatch } from "react-redux";
import { tasksSlice } from "../../features/user/databaseSlice";
import { fetchTaskCreate } from "../../features/task/taskAPI";

function CreateTaskForm(props) {
    const dispatch = useDispatch();
    const { projectName } = props;
    const accountName = localStorage.getItem('accountName');
    const currentDate = new Date().toJSON().slice(0, 10);

    const [displayCreateTaskForm, setDisplayCreateTaskForm] = useState('none');
    const [contentCreateTaskForm, setContentCreateTaskForm] = useState('+');
    const [message, setMessage] = useState("");
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskTimeDeadline, setTimeDeadline] = useState("");

    const onChangeTaskName = event => { setTaskName(event.target.value); }    
    const onChangeTaskDescription = event => { setTaskDescription(event.target.value); }
    const onChangeTaskDeadline = event => { setTimeDeadline(event.target.value); }

    const onClickCreateTaskButton = () => {
        if (displayCreateTaskForm === 'none') {
            setDisplayCreateTaskForm('block');
            setContentCreateTaskForm('-');
        }
        else {
            setDisplayCreateTaskForm('none');
            setContentCreateTaskForm('+');
        }
    }

    const onSubmit = event => {
        event.preventDefault();
        try {
            fetchTaskCreate(accountName, projectName, taskName, taskDescription, taskTimeDeadline)
            .then(response => {
                setMessage(response.message);
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
                    setDisplayCreateTaskForm('none');
                    setContentCreateTaskForm('+');
                }
                setTimeout(() => {
                    setMessage("");
                }, 2000);
            })
            .catch(response => {setMessage(response.message)});
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <>  
            <button onClick={onClickCreateTaskButton}>{contentCreateTaskForm}</button>
            <form style={{display: displayCreateTaskForm}} onSubmit={onSubmit}>
                <label htmlFor={`${projectName}_taskName`}>Task name: </label>
                <input type="text" id={`${projectName}_taskName`} name={`${projectName}_taskName`} required value={taskName} onChange={onChangeTaskName} autoComplete="off"/>
                <br></br>
                <label htmlFor={`${projectName}_taskDescription`}>Task description: </label>
                <input type="text" id={`${projectName}_taskDescription`} name={`${projectName}_taskDescription`} value={taskDescription} onChange={onChangeTaskDescription} autoComplete="off"/>
                <br></br>
                <label htmlFor={`${projectName}_taskTimeDeadline`}>Task deadline: </label>
                <input type="date" id={`${projectName}_taskTimeDeadline`} name={`${projectName}_taskTimeDeadline`} value={taskTimeDeadline} onChange={onChangeTaskDeadline} min={currentDate} required/>
                <br></br>
                <input type="submit" value=" Create task "/>
            </form>
            <p>{message}</p>
        </>
    )   
}

export default CreateTaskForm;