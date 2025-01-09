import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import './User.css';
import homepageLogo from '../../img/user/homeActive.png';
import logoPage from '../../img/user/logoPage.png';
import calendarLogo from '../../img/user/calendarLogo.png';
import dashboardLogo from '../../img/user/dashboardLogo.png';
import profileLogo from '../../img/user/profileLogo.png';
import { Footer } from "../homepage/Homepage.js";
/*------------------------------------- FEATURES -------------------------------------*/
import { profileNameSlice, projectsSlice, tasksSlice } from "../../features/user/databaseSlice.js";
import { fetchUserDatabase } from "../../features/user/userAPI.js";

import LogOut from "../../components/user/LogOut.js";

export const convertFromBooleanToDisplay = display => display ? "block" : "none";
export const convertDateToISOString = (day) => {
    const date = day.getDate();
    const month = day.getMonth();
    const year = day.getFullYear();
    
    let monthString = `${month + 1}`;
    if (monthString.length === 1) monthString = `0${monthString}`;
    let dateString = `${date}`;
    if (dateString.length === 1) dateString = `0${dateString}`;

    //console.log(`${year}-${monthString}-${dateString}`);
    return `${year}-${monthString}-${dateString}`;
}
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
            dispatch(profileNameSlice.actions.assignName(''));
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
    
    const linkIsActive = ({isActive}) => {
        return isActive ? "match" : "noMatch";
    };

    return (
        <div id="userPage">
            <div id="userNavigationBar">
                <div id="companyName">
                    <img src={logoPage} alt="logoPage"/>
                    <h3>MasterTask</h3>
                </div>
                <nav id="pageNavigation">
                    <ul>
                        <li>
                            <NavLink to="homepage" className={linkIsActive}>
                                <img src={homepageLogo} alt="homepage"/>
                                <p>Homepage</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="dashboard" className={linkIsActive}>
                                <img src={dashboardLogo} alt="dashboard"/>
                                <p>Dashboard</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="calendar" className={linkIsActive}>
                                <img src={calendarLogo} alt="calendar"/>
                                <p>Calendar</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="profile" className={linkIsActive}>
                                <img src={profileLogo} alt="profile"/>
                                <p>Profile</p>
                            </NavLink>
                        </li>
                    </ul>
                    <LogOut/>
                </nav>
            </div>
            <div id="userContent">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
}


export default User;