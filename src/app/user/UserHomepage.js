/*------------------------------------- COMPONENTS -------------------------------------*/
import ListProject from "../../components/project/Project.js";
import CreateProjectForm from "../../components/project/CreateProjectForm.js";
import FilterForm from "../../components/user/FilterForm.js";
import SortForm from "../../components/user/SortForm.js";
import SearchForm from "../../components/user/SearchForm.js";
import { Helmet } from "react-helmet";
import { profileNameSlice } from "../../features/user/databaseSlice.js";
import { useSelector } from "react-redux";

function UserHomepage(props){
    const profileName = useSelector(state => state[profileNameSlice.name]);

    return (
        <>
            <Helmet>
                <title>Homepage | ToDo List</title>
            </Helmet>
            <p>Hello {profileName}</p>
            <CreateProjectForm/>
            <FilterForm/>
            <SortForm/>
            <SearchForm/>
            <ListProject/>
        </>
    );
}

export default UserHomepage;