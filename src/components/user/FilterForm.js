import { FilterStatusFrom } from "./FilterStatusForm";
import { FilterDateForm } from "./FilterDateForm";
import { filterSlice } from "../../features/user/databaseSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

function FilterForm() {
    const dispatch = useDispatch();
    const [statusFilter, setStatusFilter] = useState(['pending', 'fulfilled', 'falling']);
    const [dateFilter, setDateFilter] = useState(
    {
        timeCreatedFrom : "",
        timeCreatedTo: "",
        timeDeadlineFrom: "",
        timeDeadlineTo: ""
    });

    useEffect(() => {
        const filter = {
            statusFilter,
            dateFilter
        }
        dispatch(filterSlice.actions.apply(filter));
    }, [statusFilter, dateFilter, dispatch]);

    return (
        <>
            <p>This is filter</p>
            <FilterStatusFrom setStatusFilter={setStatusFilter} />
            <FilterDateForm setDateFilter={setDateFilter}/>
        </>

    )
}

export default FilterForm;