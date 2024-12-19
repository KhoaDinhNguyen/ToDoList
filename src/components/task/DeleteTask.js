import { tasksSlice } from "../../features/user/databaseSlice";
import { useDispatch } from "react-redux";
import { fetchTaskDelete } from "../../features/task/taskAPI";
import './DeleteTask.css';

function DeleteTask(props) {
    const dispatch = useDispatch();
    const { task, display, setDeleteDisplay } = props;
    const { taskName, projectName } = task;
    const accountName = localStorage.getItem("accountName");

    const onClickDeleteTaskButton = () => {
        fetchTaskDelete(accountName, projectName, taskName)
        .then(response => {
            if (!response.error) {
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
    const onClickCancle = () => { setDeleteDisplay(false); };
    return (
        <div style={{display: display}}>
            <div className="deletePrompt">
                <p>Do you really want to delete this task?</p>
                <div className="deleteTaskButton">
                    <button onClick={onClickDeleteTaskButton} className="yesDeleteTaskButton"><span>Yes</span></button>
                    <button onClick={onClickCancle} className="noDeleteTaskButton"><span>No</span></button>
                </div>
            </div>
        </div>
    )
}

export default DeleteTask;