import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sortSlice } from "../../features/user/utility";
import './SortForm.css';

function SortForm() {
    const [timeCreatedASC, setTimeCreatedASC] = useState(false);
    const [timeCreatedDESC, setTimeCreatedDESC] = useState(false);
    const [taskNameASC, setTaskNameASC] = useState(false);
    const [taskNameDESC, setTaskNameDESC] = useState(false);
    const [timeDeadlineASC, setTimeDeadlineASC] = useState(true);
    const [timeDeadlineDESC, setTimeDeadlineDESC] = useState(false);
    const dispatch = useDispatch();

    const onChangeTimeCreatedASC = () => {
        if (timeCreatedASC) {
            setTimeCreatedASC(false);
        }
        else {
            setTimeCreatedASC(true);
            setTimeCreatedDESC(false);
        }
    }

    const onChangeTimeCreatedDESC = () => {
        if (timeCreatedDESC) {
            setTimeCreatedDESC(false);
        }
        else {
            setTimeCreatedDESC(true);
            setTimeCreatedASC(false);
        }
    }

    const onChangeTaskNameASC = () => {
        if (taskNameASC) {
            setTaskNameASC(false);
        }
        else {
            setTaskNameASC(true);
            setTaskNameDESC(false);
        }
    }
    const onChangeTaskNameDESC = () => {
        if (taskNameDESC) {
            setTaskNameDESC(false);
        }
        else {
            setTaskNameDESC(true);
            setTaskNameASC(false);
        }
    }

    const onChangeTimeDeadlineASC = () => {
        if (timeDeadlineASC) {
            setTimeDeadlineASC(false);
        }
        else {
            setTimeDeadlineASC(true);
            setTimeDeadlineDESC(false);
        }
    }

    const onChangeTimeDeadlineDESC = () => {
        if (timeDeadlineDESC) {
            setTimeDeadlineDESC(false);
        }
        else {
            setTimeDeadlineDESC(true);
            setTimeDeadlineASC(false);
        }
    }

    useEffect(() => {
        const sort = {
            sortTimeCreated: undefined,
            sortTaskName: undefined,
            sortTimeDeadline: undefined
        };
        if (taskNameASC) sort.sortTaskName = true;
        else if (taskNameDESC) sort.sortTaskName = false;

        if (timeCreatedASC) sort.sortTimeCreated = true;
        else if (timeCreatedDESC) sort.sortTimeCreated = false;

        if (timeDeadlineASC) sort.sortTimeDeadline = true;
        else if (timeDeadlineDESC) sort.sortTimeDeadline = false;
        dispatch(sortSlice.actions.apply(sort));

    },[taskNameASC, taskNameDESC, timeCreatedASC, timeCreatedDESC, timeDeadlineASC, timeDeadlineDESC, dispatch]);

    const onClickResetSort = () => {
        setTaskNameASC(true);
        setTaskNameDESC(false);
        setTimeCreatedASC(false);
        setTimeCreatedDESC(false);
        setTimeDeadlineASC(false);
        setTimeDeadlineDESC(false);
    }
    return (
        <div id="sortForm">
            <h3>Sort</h3>
            <div id="sortFilter">
                <div id="sortTaskName">
                    <h4>Task name</h4>
                    <div className="statusBox">
                        <input type="checkbox" name="sortTaskNameASC" id="sortTaskNameASC" checked={taskNameASC} onChange={onChangeTaskNameASC}/>
                        <label htmlFor="sortTaskNameASC">ASC</label>
                    </div>
                    <div className="statusBox">
                        <input type="checkbox" name="sortTaskNameDESC" id="sortTaskNameDESC" checked={taskNameDESC} onChange={onChangeTaskNameDESC}/>
                        <label htmlFor="sortTaskNameDESC">DESC</label>
                    </div>
                </div>
                <div id="sortTimeCreated">
                    <h4>Time created</h4>
                    <div className="statusBox">
                        <input type="checkbox" name="sortTimeCreatedASC" id="sortTimeCreatedASC" checked={timeCreatedASC} onChange={onChangeTimeCreatedASC}/>
                        <label htmlFor="sortTimeCreatedASC">ASC</label>
                    </div>
                    <div className="statusBox">
                        <input type="checkbox" name="sortImeCreatedDESC" id="sortImeCreatedDESC" checked={timeCreatedDESC} onChange={onChangeTimeCreatedDESC}/>
                        <label htmlFor="sortImeCreatedDESC">DESC</label>
                    </div>
                </div>
                <div id="sortTimeDeadline">
                    <h4>Time deadline </h4>
                    <div className="statusBox">
                        <input type="checkbox" name="sortTimeDeadlineASC" id="sortTimeDeadlineASC" checked={timeDeadlineASC} onChange={onChangeTimeDeadlineASC}/>
                        <label htmlFor="sortTimeDeadlineASC">ASC</label>
                    </div>
                    <div className="statusBox">
                        <input type="checkbox" name="sortTimeDeadlineDESC" id="sortTimeDeadlineDESC" checked={timeDeadlineDESC} onChange={onChangeTimeDeadlineDESC}/>
                        <label htmlFor="sortTimeDeadlineDESC">DESC</label>
                    </div>
                </div>
                <button id="clearSort" onClick={onClickResetSort}>Clear sort</button>
            </div>
        </div>
    )
}

export default SortForm;