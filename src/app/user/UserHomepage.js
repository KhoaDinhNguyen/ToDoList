/*------------------------------------- COMPONENTS -------------------------------------*/
import ListProject from "../../components/project/Project.js";
import CreateProjectForm from "../../components/project/CreateProjectForm.js";
import FilterForm from "../../components/user/FilterForm.js";
import SortForm from "../../components/user/SortForm.js";
import SearchForm from "../../components/user/SearchForm.js";
import { Helmet } from "react-helmet";
import { profileNameSlice } from "../../features/user/databaseSlice.js";
import { useSelector } from "react-redux";
import './UserHomepage.css';

function UserHomepage(props){
    const profileName = useSelector(state => state[profileNameSlice.name]);

    return (
        <div id="userHomepage">
            <Helmet>
                <title>Homepage | ToDo List</title>
            </Helmet>
            <div id="profileName">
                <h2>Hello {profileName} !&#128526;</h2>
            </div>
            <SearchForm/>
            <div id="userHomepageBody">
                <div id="filterAndSort">
                    <FilterForm/>
                    <SortForm/>
                </div>
                <div id="userHomepageMain">
                    <CreateProjectForm/>
                    <ListProject/>
                </div>
            </div>
        </div>
    );
}

export default UserHomepage;