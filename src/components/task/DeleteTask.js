import { tasksSlice } from "../../features/user/databaseSlice";
import { useDispatch } from "react-redux";
import { fetchTaskDelete } from "../../features/task/taskAPI";

function DeleteTask(props) {
    const dispatch = useDispatch();
    const {taskName, projectName} = props.task;
    const accountName = localStorage.getItem("accountName");

    const onClickDeleteTaskButton = () => {
        fetchTaskDelete(accountName, projectName, taskName)
        .then(response => {
            if (response.message === 'Delete task sucessfully') {
                dispatch(tasksSlice.actions.remove({
                    taskName,
                    projectName
                }));
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <button onClick={onClickDeleteTaskButton}>Delete task</button>
    )
}

export default DeleteTask;