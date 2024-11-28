import { FilterStatusFrom } from "./FilterStatusForm";
import { FilterDateForm } from "./FilterDateForm";
import { filterSlice } from "../../features/user/utility";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

function FilterForm() {
    const dispatch = useDispatch();
    const [statusFilter, setStatusFilter] = useState(['pending', 'fulfilled', 'falling']);
    const [importantFilter, setImporantFilter] = useState(false);
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
            dateFilter,
            importantFilter
        }
        dispatch(filterSlice.actions.apply(filter));
    }, [statusFilter, dateFilter, dispatch, importantFilter]);

    const onChangeStar = () => {
        setImporantFilter(importantFilter => !importantFilter);
    }
    return (
        <>
            <p>This is filter</p>
            <p>Star</p>
            <label htmlFor="starFilter">Star</label>
            <input type="checkbox" id="starFilter" name="starFilter" checked={importantFilter} onChange={onChangeStar}/>
            <FilterStatusFrom setStatusFilter={setStatusFilter} />
            <FilterDateForm setDateFilter={setDateFilter}/>
        </>

    )
}

export default FilterForm;