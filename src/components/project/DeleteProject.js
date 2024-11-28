import { fetchDeleteProject } from "../../features/project/projectAPI";
import { tasksSlice, projectsSlice } from "../../features/user/databaseSlice";
import { useDispatch } from "react-redux";

function DeleteProject(props) {
    const dispatch = useDispatch();
    const { accountName, projectName } = props;

    const onClickDeleteProject = () => {
        fetchDeleteProject(accountName, projectName)
        .then(response => {
            dispatch(tasksSlice.actions.removeFromProject(projectName));
            dispatch(projectsSlice.actions.remove(projectName));
        })
        .catch(err => {
            console.log(err);
        });
    }
    return (
        <button onClick={onClickDeleteProject}>Delete project</button>
    );
};

export default DeleteProject;
