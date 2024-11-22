import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

/*------------------------------------- FEATURES -------------------------------------*/
import { projectsSlice, tasksSlice } from "../../features/user/databaseSlice.js";
import { fetchUserDatabase } from "../../features/user/userAPI.js";

/*------------------------------------- COMPONENTS -------------------------------------*/
import ListProject from "../../components/project/Project.js";
import CreateProjectForm from "../../components/project/CreateProjectForm.js";
import LogOut from "../../components/user/LogOut.js";

function UserHomepage(props){
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const accountName = params.username;
    const accountNameAuthen = localStorage.getItem('accountName');
    const profileName = localStorage.getItem('profileName');

    useEffect(() => {
        if (accountName !== accountNameAuthen) {
            alert('BAD');
            localStorage.setItem('accountName', '');
            localStorage.setItem('profileName', '');
            navigate('/homepage/login');
        }

        fetchUserDatabase(accountName)
        .then(response => {
            dispatch(tasksSlice.actions.initialize(response));
            dispatch(projectsSlice.actions.initialize(response));
        })
        .catch(err => {
            console.log(err);
        });

    }, [dispatch, navigate, accountName, accountNameAuthen]);
    
    return (
        <>
            <CreateProjectForm/>
            <p>{accountName} - Full name: {profileName}</p>
            <ListProject/>
            <LogOut/>
        </>
    )
}

export default UserHomepage;