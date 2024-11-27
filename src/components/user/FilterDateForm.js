import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";

function FilterDateForm(props) {
    const [timeCreatedFrom, setTimeCreatedFrom] = useState("");
    const [timeCreatedTo, setTimeCreatedTo] = useState("");
    const [timeDeadlineFrom, setTimeDeadlineFrom] = useState("");
    const [timeDeadlineTo, setTimeDeadlineTo] = useState("");
    const dispatch = useDispatch();
    const { setDateFilter } = props;

    const onChangeSetTimeCreatedFrom = event => { 
        setTimeCreatedFrom(event.target.value); 
    }
    const onChangeSetTimeCreatedTo = event => { 
        setTimeCreatedTo(event.target.value); 
    }
    const onChangeSetTimeDeadlineFrom = event => { 
        setTimeDeadlineFrom(event.target.value); 
    }
    const onChangeSetTimeDeadlineTo = event => { 
        setTimeDeadlineTo(event.target.value); 
    }

    useEffect(() => {
        const dateFilter = {
            timeCreatedFrom,
            timeCreatedTo,
            timeDeadlineFrom,
            timeDeadlineTo
        };

        setDateFilter(dateFilter);

    }, [timeCreatedFrom, timeCreatedTo, timeDeadlineFrom, timeDeadlineTo, dispatch, setDateFilter]);

    const onClickClearDate = () => {
        setTimeCreatedFrom("");
        setTimeCreatedTo("");
        setTimeDeadlineFrom("");
        setTimeDeadlineTo("");
    }
    return (
        <>
            <div id="timeFilter">
                <p>Task time created: </p>
                <label htmlFor="timeFilterCreatedTimeBegin">From: </label>
                <br/>
                <input type="date" id="timeFilterCreatedTimeBegin" name="timeFilterCreatedTimeBegin" value={timeCreatedFrom} onChange={onChangeSetTimeCreatedFrom}/>
                <br/>
                <label htmlFor="timeFilterCreatedTimeEnd">To: </label>
                <br/>
                <input type="date" id="timeFilterCreatedTimeEnd" name="timeFilterCreatedTimeEnd" value={timeCreatedTo} onChange={onChangeSetTimeCreatedTo} min={timeCreatedFrom}/>
                <p>Task time deadline: </p>
                <label htmlFor="timeFilterDeadlineTimeBegin">From: </label>
                <br/>
                <input type="date" id="timeFilterDeadlineTimeBegin" name="timeFilterDeadlineTimeBegin" value={timeDeadlineFrom} onChange={onChangeSetTimeDeadlineFrom} min={timeCreatedFrom}/>
                <br/>
                <label htmlFor="timeFilterDeadlineTimeEnd">To: </label>
                <br/>
                <input type="date" id="timeFilterDeadlineTimeEnd" name="timeFilterDeadlineTimeEnd" value={timeDeadlineTo} onChange={onChangeSetTimeDeadlineTo} min={timeDeadlineFrom}/>
                <br/>
                <button onClick={onClickClearDate}>Clear date</button>
            </div>
        </>
    )
}

export {
    FilterDateForm
}