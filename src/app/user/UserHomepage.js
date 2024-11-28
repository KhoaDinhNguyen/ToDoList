/*------------------------------------- COMPONENTS -------------------------------------*/
import ListProject from "../../components/project/Project.js";
import CreateProjectForm from "../../components/project/CreateProjectForm.js";
import FilterForm from "../../components/user/FilterForm.js";
import SortForm from "../../components/user/SortForm.js";
import SearchForm from "../../components/user/SearchForm.js";
import { Helmet } from "react-helmet";

function UserHomepage(props){
    const profileName = localStorage.getItem('profileName');

    return (
        <>
            <Helmet>
                <title>Homepage | ToDo List</title>
            </Helmet>
            <CreateProjectForm/>
            <FilterForm/>
            <SortForm/>
            <SearchForm/>
            <p>Hello {profileName}</p>
            <ListProject/>
        </>
    );
}

export default UserHomepage;