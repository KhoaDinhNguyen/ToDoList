import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newTaskName, newTaskDescription, newTaskDeadline } from "../../features/task/createTaskSlice";
import { tasksSlice } from "../../features/user/databaseSlice";
import { fetchTaskCreate } from "../../features/task/taskAPI";

function CreateTaskForm(props) {
    const dispatch = useDispatch();
    const projectName = props.projectName;
    const accountName = localStorage.getItem('accountName');

    
    const taskName = useSelector(state => state[newTaskName.name]);
    const taskDescription = useSelector(state => state[newTaskDescription.name]);
    const taskTimeDeadline = useSelector(state => state[newTaskDeadline.name]);
    
    const [displayCreateTaskForm, setDisplayCreateTaskForm] = useState('none');
    const [contentCreateTaskForm, setContentCreateTaskForm] = useState('+');
    const [message, setMessage] = useState("");
    
    const currentDate = new Date().toJSON().slice(0, 10);

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

    const onChangeTaskName = (event) => {
        dispatch(newTaskName.actions.add(event.target.value));
    }
    
    const onChangeTaskDescription = (event) => {
        dispatch(newTaskDescription.actions.add(event.target.value));
    }

    const onChangeTaskDeadline = (event) => {
        dispatch(newTaskDeadline.actions.add(event.target.value));
    }

    const onSubmit = (event) => {
        event.preventDefault();
        try {
            fetchTaskCreate(accountName, projectName, taskName, taskDescription, taskTimeDeadline)
            .then(response => {
                setMessage(response.message);
                if (response.message === 'Create task sucessfully') {
                    dispatch(tasksSlice.actions.add({
                        taskName,
                        taskStatus: 'pending',
                        taskDescription,
                        taskTimeCreated: currentDate,
                        taskTimeDeadline,
                        projectName
                    }));
                    dispatch(newTaskName.actions.clear());
                    dispatch(newTaskDescription.actions.clear());
                    dispatch(newTaskDeadline.actions.clear());
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
            <Response message={message}/>
        </>
    )   
}

function Response(props) {
    const message = props.message;

    if (message === 'duplicate key value violates unique constraint "tasks_pkey"') {
        return (
            <p>Task duplicated</p>
        );
    }
    else if (message === 'Create task sucessfully') {
        return (
            <p>Create task sucessfully</p>
        );
    }
    return (
        <>
            <p></p>
        </>
    )

}
export default CreateTaskForm;