import FilterForm from "./FilterForm";
import SortForm from "./SortForm";
import { useSelector } from "react-redux";
import { filterAndSortFormSlice } from "../../features/user/utility";
import { convertFromBooleanToDisplay } from "../../app/user/User";
import './FilterAndSort.css';

function FilterAndSortForm() {
    const filterAndSortDisplay = useSelector(state => state[filterAndSortFormSlice.name]);

    return (
        <div style={{display: convertFromBooleanToDisplay(filterAndSortDisplay)}}>
            <div id="filterAndSortForm">
                <FilterForm/>
                <SortForm/>
            </div>
        </div>
    )
}

export default FilterAndSortForm;