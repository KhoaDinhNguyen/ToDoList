import { useDispatch } from "react-redux";
import { createProjectFormSlice } from "../../features/user/utility";
import './CreateProjectButton.css';

function CreateProjectButton() {
    const dispatch = useDispatch();
    const onClickOpenForm = () => { dispatch(createProjectFormSlice.actions.setState(true))};

    return(
        <>
            <div id="createProjectButton">
                <button onClick={onClickOpenForm} id="openCreateProjectButton"><span>&#x271A; Create project</span></button>
            </div>
        </>

    )
}

export default CreateProjectButton;
