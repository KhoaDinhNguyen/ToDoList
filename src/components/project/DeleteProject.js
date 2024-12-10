import { fetchDeleteProject } from "../../features/project/projectAPI";
import { tasksSlice, projectsSlice } from "../../features/user/databaseSlice";
import { useDispatch } from "react-redux";
import './DeleteProject.css';

function DeleteProject(props) {
    const dispatch = useDispatch();
    const { accountName, projectName, deleteDisplay, setDeleteDisplay } = props;

    const onClickDeleteProject = () => {
        fetchDeleteProject(accountName, projectName)
        .then(response => {
            dispatch(tasksSlice.actions.removeFromProject(projectName));
            dispatch(projectsSlice.actions.remove(projectName));
        })
        .catch(err => {
            console.log(err);
        });
    };
    const onClickCancle = () => {
        setDeleteDisplay(false);
    }

    return (
        <div style={{display: deleteDisplay}} className="detetePrompt">
            <div className="deletePromptBody">
                <div className="deletePromptMain">
                    <p>Do you really want to delete this project?</p>
                    <p>&#9432; All tasks will be removed followedly</p>
                </div>
                <div className="deletePromptButton">
                    <button onClick={onClickDeleteProject}>Yes, I want to delete it</button>
                    <button onClick={onClickCancle}>No, I think I will keep it</button>
                </div>
            </div>
        </div>

    );
};

export default DeleteProject;
