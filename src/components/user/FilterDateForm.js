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
                <div id="timeFilterCreatedTime">
                    <h4>Task time created</h4>
                    <div className="dateFilter">
                        <label htmlFor="timeFilterCreatedTimeBegin">From</label>
                        <input type="date" id="timeFilterCreatedTimeBegin" name="timeFilterCreatedTimeBegin" value={timeCreatedFrom} onChange={onChangeSetTimeCreatedFrom}/>
                    </div>
                    <div className="dateFilter">
                        <label htmlFor="timeFilterCreatedTimeEnd">To</label>
                        <input type="date" id="timeFilterCreatedTimeEnd" name="timeFilterCreatedTimeEnd" value={timeCreatedTo} onChange={onChangeSetTimeCreatedTo} min={timeCreatedFrom}/>
                    </div>
                </div>
                <div id="timeFilterDeadlineTime">
                    <h4>Task time deadline</h4>
                    <div className="dateFilter">
                        <label htmlFor="timeFilterDeadlineTimeBegin">From</label>
                        <input type="date" id="timeFilterDeadlineTimeBegin" name="timeFilterDeadlineTimeBegin" value={timeDeadlineFrom} onChange={onChangeSetTimeDeadlineFrom} min={timeCreatedFrom}/>
                    </div>
                    <div className="dateFilter">
                        <label htmlFor="timeFilterDeadlineTimeEnd">To</label>
                        <input type="date" id="timeFilterDeadlineTimeEnd" name="timeFilterDeadlineTimeEnd" value={timeDeadlineTo} onChange={onChangeSetTimeDeadlineTo} min={timeDeadlineFrom}/>
                    </div>
                </div>
                <button id="clearDate" onClick={onClickClearDate}>Clear date</button>
            </div>
        </>
    )
}

export {
    FilterDateForm
}