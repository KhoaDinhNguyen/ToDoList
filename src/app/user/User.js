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
                <div id="userNavigationBarHeader">
                    <div id="companyName">
                        <img src={logoPage} alt="logoPage"/>
                    </div>
                </div>
                <nav id="pageNavigation">
                    <ul>
                        <li>
                            <NavLink to="homepage" className={linkIsActive}>
                            <svg width="25px" height="25px" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                <g id="SVGRepo_iconCarrier">
                                <path clipRule="evenodd" d="M16.3382 1.94393L25.9705 9.82424L26.0201 9.8788C26.1701 10.0437 26.3998 10.3064 26.5943 10.6198C26.7798 10.9189 27 11.3686 27 11.8956V24.9976C27 26.1013 26.1068 27 25 27H18.7601C17.9317 27 17.2601 26.3284 17.2601 25.5V20.7939C17.2601 18.9948 15.8058 17.5405 14.0168 17.5405C12.2279 17.5405 10.7735 18.9948 10.7735 20.7939V25.5C10.7735 26.3284 10.102 27 9.27354 27H3C1.89318 27 1 26.1013 1 24.9976V11.7425C1 11.0901 1.36299 10.564 1.56986 10.3028C1.69049 10.1505 1.80873 10.0264 1.89631 9.94036C1.9407 9.89677 1.97877 9.86147 2.0074 9.83565C2.02175 9.8227 2.03384 9.81204 2.0433 9.80382L2.05551 9.79329L2.06007 9.7894L2.06278 9.7871C2.06278 9.7871 2.06356 9.78646 2.7075 10.5515L2.06356 9.78646L2.07352 9.77807L11.6288 1.94617C12.9452 0.685478 15.0206 0.684487 16.3382 1.94393ZM3.35246 11.3159L3.3468 11.3209C3.33673 11.33 3.31953 11.3459 3.29759 11.3674C3.25251 11.4117 3.19388 11.4736 3.13764 11.5446C3.07966 11.6178 3.038 11.6834 3.01374 11.7344C3.00661 11.7494 3.00238 11.7602 3 11.767V24.9976L3.00006 24.9992L3.0007 25H8.77354V20.7939C8.77354 17.8948 11.1188 15.5405 14.0168 15.5405C16.9149 15.5405 19.2601 17.8948 19.2601 20.7939V25H24.9993L24.9999 24.9992L25 24.9976V11.8956C25 11.8989 25.0008 11.8992 25 11.8956C24.9966 11.8812 24.9788 11.8095 24.8948 11.6742C24.8108 11.5389 24.7005 11.4037 24.588 11.2772L15.004 3.43645L14.9714 3.40439C14.4228 2.86484 13.5451 2.86525 12.997 3.40534L12.9644 3.43744L3.35246 11.3159Z" fill="#ffffff" fillRule="evenodd"/>
                                </g>
                            </svg>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="dashboard" className={linkIsActive}>
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                <g id="SVGRepo_iconCarrier"> <path d="M12 12C12 11.4477 12.4477 11 13 11H19C19.5523 11 20 11.4477 20 12V19C20 19.5523 19.5523 20 19 20H13C12.4477 20 12 19.5523 12 19V12Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/> <path d="M4 5C4 4.44772 4.44772 4 5 4H8C8.55228 4 9 4.44772 9 5V19C9 19.5523 8.55228 20 8 20H5C4.44772 20 4 19.5523 4 19V5Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/> <path d="M12 5C12 4.44772 12.4477 4 13 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H13C12.4477 8 12 7.55228 12 7V5Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/> </g>
                            </svg>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="calendar" className={linkIsActive}>
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                <g id="SVGRepo_iconCarrier"> <path d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> </g>
                                </svg>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="profile" className={linkIsActive}>
                                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="0.6">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                    <g id="SVGRepo_iconCarrier"> <g id="style=stroke"> <g id="profile"> <path id="vector (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M12 2.75C9.92893 2.75 8.25 4.42893 8.25 6.5C8.25 8.57107 9.92893 10.25 12 10.25C14.0711 10.25 15.75 8.57107 15.75 6.5C15.75 4.42893 14.0711 2.75 12 2.75ZM6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z" fill="#ffffff"/> <path id="rec (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714ZM9.57143 14.75C7.46091 14.75 5.75 16.4609 5.75 18.5714C5.75 20.0508 6.94924 21.25 8.42857 21.25H15.5714C17.0508 21.25 18.25 20.0508 18.25 18.5714C18.25 16.4609 16.5391 14.75 14.4286 14.75H9.57143Z" fill="#ffffff"/> </g> </g> </g>
                                </svg>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <LogOut/>
            </div>
            <div id="userContent">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
}


export default User;