import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { projectsSlice, tasksSlice } from "../features/fetchingData/databaseDataSlice.js";
import { fullNameSlice } from "../features/fetchingData/userDataSlice.js";
import { useEffect } from "react";
import ListProject from "../components/Project.js";
import CreateProjectForm from "../components/project/CreateProjectForm.js";

const url = process.env.REACT_APP_USER_API_URL;

const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    })
}

function User(){
    const params = useParams();
    const navigate = useNavigate();
    const fullName = useSelector((state) => state[fullNameSlice.name]);
    const userName = params.username;
    const dispatch = useDispatch();
    const endpoint = url + userName;
    
    const userNameAuthen = sessionStorage.getItem('username');

    useEffect(() => {
        if (userNameAuthen !== userName) {
            alert('BAD');
            navigate('/ToDoList/login');
        }
        fetchData(endpoint).then(data => {
            dispatch(tasksSlice.actions.initialize(data));
            dispatch(projectsSlice.actions.initialize(data));
        }).catch(error => {
            console.log(error);
        });
    }, [endpoint, dispatch, navigate, userName, userNameAuthen]);
    

    if (userNameAuthen !== userName) {
        return <></>;
    }

    return (
        <>
            <CreateProjectForm userName={userName}/>
            <p>{userName} - Full name: {fullName}</p>
            <ListProject />
        </>
    )
}

function UserHeader() {
    return (
        <>
            <Outlet/>
        </>
    )
}


export {UserHeader, User};