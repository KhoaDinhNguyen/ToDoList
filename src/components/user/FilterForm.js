import { useState } from "react";
import { filterSlice } from "../../features/user/databaseSlice";
import { useDispatch } from "react-redux";

function FilterForm() {
    const dispatch = useDispatch();
    const [allStatus, setAllStatus] = useState(true);
    const [pending, setPending] = useState(true);
    const [fulfilled, setFulfilled] = useState(true);
    const [falling, setFalling] = useState(true);

    const onChangeAllStatus = () => {
        setPending(!allStatus);
        setFulfilled(!allStatus);
        setFalling(!allStatus);
        setAllStatus(!allStatus);
    };

    const onChangePending = () => {
        setPending(!pending);
    };

    const onChangeFulfilled = () => {
        setFulfilled(!fulfilled);
    };

    const onChangeFalling = () => {
        setFalling(!falling);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const statusFilter = [];
        if (pending) statusFilter.push("pending");
        if (fulfilled) statusFilter.push("fulfilled");
        if (falling) statusFilter.push("falling");

        const filter = {statusFilter};

        dispatch(filterSlice.actions.apply(filter));
    };

    return (
        <>
            <p>This is filter</p>
            <form onSubmit={onSubmit}>
                <div id="statusFilter">
                    <p>Status</p>
                    <input type="checkbox" id="pendingFiler" name="pendingFilter" checked={pending} onChange={onChangePending}/>
                    <label htmlFor="pendingFilter">Pending</label>
                    <input type="checkbox" id="fulfilledFilter" name="fulfilledFilter" checked={fulfilled} onChange={onChangeFulfilled}/>
                    <label htmlFor="fulfilledFilter">Fulfilled</label>
                    <input type="checkbox" id="failingFiler" name="failingFilter" checked={falling} onChange={onChangeFalling}/>
                    <label htmlFor="failingFilter">Falling</label>
                    <input type="checkbox" id="allStatus" name="allStatus" value="allStatus" checked={allStatus} onChange={onChangeAllStatus}/>
                    <label htmlFor="allStatus">All apply</label>
                </div>
                <input type="submit" name="apply"/>
            </form>
        </>

    )
}

export default FilterForm;