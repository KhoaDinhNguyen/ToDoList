import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function FilterStatusFrom(props) {
    const dispatch = useDispatch();
    const [allStatus, setAllStatus] = useState(true);
    const [pending, setPending] = useState(true);
    const [fulfilled, setFulfilled] = useState(true);
    const [failing, setFailing] = useState(true);
    const { setStatusFilter} = props;

    const onChangeAllStatus = () => {
        setPending(!allStatus);
        setFulfilled(!allStatus);
        setFailing(!allStatus);
        setAllStatus(!allStatus);
    };

    const onChangePending = () => {
        setPending(!pending);
    };

    const onChangeFulfilled = () => {
        setFulfilled(!fulfilled);
    };

    const onChangeFailing = () => {
        setFailing(!failing);
    };

    useEffect(() => {
        const statusFilter = [];
        if (pending) statusFilter.push("pending");
        if (fulfilled) statusFilter.push("fulfilled");
        if (failing) statusFilter.push("failing");
        setStatusFilter(statusFilter);
    }, [pending, fulfilled, failing, dispatch, setStatusFilter]);

    return (
        <>
            <div id="statusFilter">
                <p>Status</p>
                <input type="checkbox" id="pendingFitler" name="pendingFitler" checked={pending} onChange={onChangePending}/>
                <label htmlFor="pendingFitler">Pending</label>
                <input type="checkbox" id="fulfilledFilter" name="fulfilledFilter" checked={fulfilled} onChange={onChangeFulfilled}/>
                <label htmlFor="fulfilledFilter">Fulfilled</label>
                <input type="checkbox" id="failingFilter" name="failingFilter" checked={failing} onChange={onChangeFailing}/>
                <label htmlFor="failingFilter">Failing</label>
                <input type="checkbox" id="allStatus" name="allStatus" value="allStatus" checked={allStatus} onChange={onChangeAllStatus}/>
                <label htmlFor="allStatus">All apply</label>
            </div>
        </>
    )
}

export {
    FilterStatusFrom,
}