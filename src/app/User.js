import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { projectsSlice, tasksSlice } from "../features/fetchingData/databaseDataSlice.js";
import { fullNameSlice } from "../features/fetchingData/userDataSlice.js";
import { useEffect } from "react";
import ListProject from "../components/Project.js";

const url = "http://localhost:8080/user/";


const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    })
}

function User(){
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const fullName = useSelector((state) => state[fullNameSlice.name]);
    const userName = params.username;
    const endpoint = url + userName;
    
    useEffect(() => {
        console.log(endpoint);
        fetchData(endpoint).then(data => {
            if (data.error === 'BAD CREDENTIALS') {
                navigate('/ToDoList/login');
            }
            else {
                console.log(data);
                dispatch(tasksSlice.actions.initialize(data));
                dispatch(projectsSlice.actions.initialize(data));
            }
        }).catch(error => {
            console.log(error);
        });
    }, [endpoint, dispatch, navigate]);
    

    return (
        <>
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