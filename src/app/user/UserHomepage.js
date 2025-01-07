/*------------------------------------- COMPONENTS -------------------------------------*/
import ListProject from "../../components/project/Project.js";
import CreateProjectButton from "../../components/project/CreateProjectButton.js";
import FilterForm from "../../components/user/FilterForm.js";
import SortForm from "../../components/user/SortForm.js";
import SearchForm from "../../components/user/SearchForm.js";
import { Helmet } from "react-helmet";
import CreateProjectForm from "../../components/project/CreateProjectForm.js";
import FilterButton from "../../components/user/FilterButton.js";
import './UserHomepage.css';
import FilterAndSortForm from "../../components/user/FilterAndSort.js";

function UserHomepage(props){
    return (
        <div id="userHomepage">
            <Helmet>
                <title>Homepage | ToDo List</title>
            </Helmet>
            <div id="userHomepageHeader">
                <FilterButton/>
                <SearchForm/>
                <CreateProjectButton/>
            </div>
            <div id="userHomepageTool">
                <CreateProjectForm/>
                <FilterAndSortForm/>
            </div>
            <div id="userHomepageBody">
                <div id="userHomepageMain">
                    <ListProject/>
                </div>
            </div>
        </div>
    );
}

export default UserHomepage;