/*------------------------------------- COMPONENTS -------------------------------------*/
import ProjectList from "../../components/project/Project.js";
import CreateProjectButton from "../../components/project/CreateProjectButton.js";
import SearchForm from "../../components/user/SearchForm.js";
import { Helmet } from "react-helmet";
import CreateProjectForm from "../../components/project/CreateProjectForm.js";
import FilterButton from "../../components/user/FilterButton.js";
import './UserHomepage.css';
import FilterAndSortForm from "../../components/user/FilterAndSort.js";

function UserHomepage(props){

    return (
        <>
            <Helmet>
                <title>Homepage | ToDo List</title>
            </Helmet>
            <div id="userHomepage">
                <div className="pageActive">
                    <p>To-do List Application</p>
                    <h2>Homepage</h2>
                </div>
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
                        <ProjectList/>
                    </div>
                </div>
            </div>
        </>

    );
}

export default UserHomepage;