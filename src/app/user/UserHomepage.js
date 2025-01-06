/*------------------------------------- COMPONENTS -------------------------------------*/
import ListProject from "../../components/project/Project.js";
import CreateProjectForm from "../../components/project/CreateProjectForm.js";
import FilterForm from "../../components/user/FilterForm.js";
import SortForm from "../../components/user/SortForm.js";
import SearchForm from "../../components/user/SearchForm.js";
import { Helmet } from "react-helmet";

import './UserHomepage.css';

function UserHomepage(props){
    return (
        <div id="userHomepage">
            <Helmet>
                <title>Homepage | ToDo List</title>
            </Helmet>
            <div id="profileNameHomepage">
                <SearchForm/>
                <CreateProjectForm/>
            </div>
            <div id="userHomepageBody">
                <div id="filterAndSort">
                    <FilterForm/>
                    <SortForm/>
                </div>
                <div id="userHomepageMain">
                    <ListProject/>
                </div>
            </div>
        </div>
    );
}

export default UserHomepage;