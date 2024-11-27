import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sortSlice } from "../../features/user/utility";

function SortForm() {
    const [timeCreatedASC, setTimeCreatedASC] = useState(false);
    const [timeCreatedDESC, setTimeCreatedDESC] = useState(false);
    const [taskNameASC, setTaskNameASC] = useState(true);
    const [taskNameDESC, setTaskNameDESC] = useState(false);
    const [timeDeadlineASC, setTimeDeadlineASC] = useState(false);
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
        <>
            <p>This is sort</p>
            <div id="sortFilter">
                <p>Task name</p>
                <label htmlFor="sortTaskNameASC">ASC</label>
                <input type="checkbox" name="sortTaskName" id="sortTaskNameASC" checked={taskNameASC} onChange={onChangeTaskNameASC}/>
                <label htmlFor="sorTaskNameDESC">DESC</label>
                <input type="checkbox" name="sortTaskName" id="sorTaskNameDESC" checked={taskNameDESC} onChange={onChangeTaskNameDESC}/>
                <p>Time created</p>
                <label htmlFor="sortTimeCreatedASC">ASC</label>
                <input type="checkbox" name="sortTimeCreated" id="sortTimeCreatedASC" checked={timeCreatedASC} onChange={onChangeTimeCreatedASC}/>
                <label htmlFor="sortImeCreatedDESC">DESC</label>
                <input type="checkbox" name="sortTimeCreated" id="sortImeCreatedDESC" checked={timeCreatedDESC} onChange={onChangeTimeCreatedDESC}/>
                <p>Time deadline </p>
                <label htmlFor="sortTimeDeadlineASC">ASC</label>
                <input type="checkbox" name="sortTimeDeadline" id="sortTimeDeadlineASC" checked={timeDeadlineASC} onChange={onChangeTimeDeadlineASC}/>
                <label htmlFor="sorTimeDeadlineDESC">DESC</label>
                <input type="checkbox" name="sortTimeDeadline" id="sorTimeDeadlineDESC" checked={timeDeadlineDESC} onChange={onChangeTimeDeadlineDESC}/>
                <br/>
                <button onClick={onClickResetSort}>Clear sort</button>
            </div>
        </>
    )
}

export default SortForm;