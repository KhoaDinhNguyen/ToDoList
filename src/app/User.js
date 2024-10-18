import { Outlet, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { projectsSlice, tasksSlice } from "../features/fetchingData/databaseDataSlice.js";
import { useEffect } from "react";

const url = "http://localhost:8080/";

const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error("Network..")
            }
            return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    })
}

function User(){
    const dispatch = useDispatch();
    const params = useParams();
    const userName = params.username;
    const endpoint = url + userName;

    useEffect(() => {
        fetchData(endpoint).then(data => {
            dispatch(tasksSlice.actions.initialize(data));
            dispatch(projectsSlice.actions.initialize(data));
        }).catch(error => {throw error});
    }, [endpoint, dispatch]);
    

    return (
        <>
            <p>{userName}</p>
            <p></p>
        </>
    )
}

function UserHeader() {
    return (
        <>
            <p>This is header</p>
            <Outlet/>
        </>
    )
}

function ListProject(prop) {
    const projects = prop.projects;
    const projectsList = [];
    for(const project of projects) {
        projectsList.push(<li key={project.name}><p className="project">{project.name}</p></li>);
    }

    return (
        <>
            <ul>
                {projectsList}
            </ul>
        </>
    )
}
export {UserHeader, User};