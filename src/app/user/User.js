import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
/*------------------------------------- FEATURES -------------------------------------*/
import { profileNameSlice, projectsSlice, tasksSlice } from "../../features/user/databaseSlice.js";
import { fetchUserDatabase } from "../../features/user/userAPI.js";

import LogOut from "../../components/user/LogOut.js";

function User() {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const accountName = params.username;
    const accountNameAuthen = localStorage.getItem('accountName');

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
            dispatch(profileNameSlice.actions.assignName(response[0].profileName));
        })
        .catch(err => {
            console.log(err);
        });

    }, [dispatch, navigate, accountName, accountNameAuthen]);
    
    return (
        <>  
            <nav>
                <ul>
                    <li><NavLink to="aboutUs">About Us</NavLink></li>
                    <li><NavLink to="">Homepage</NavLink></li>
                    <li><NavLink to="dashboard">Dashboard</NavLink></li>
                    <li><NavLink to="calender">Calender</NavLink></li>
                    <li><NavLink to="profile">Profile</NavLink></li>
                </ul>
            </nav>
            <Outlet/>
            <LogOut/>
        </>
    );
}


export default User;