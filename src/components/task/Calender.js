import { useState } from "react";
import "./calender.css"
import { DefaultTaskDisplay } from "./taskDisplay";

function Calender(props) {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const [calenderMonth, setCalenderMonth] = useState(month);
    const [calenderYear, setCalenderYear] = useState(year);
    const [calenderDate, setCalenderDate] = useState("");

    const { tasks } = props;
    const firstDayOfMonth = new Date(`${calenderYear} ${calenderMonth}`);

    const currenDate = new Date(firstDayOfMonth);
    const tableBody = [];
    let i = 0, left = 0, numsOfRow = 0, row = [];

    while (currenDate.getMonth() === firstDayOfMonth.getMonth()) {
        while (i !== currenDate.getDay()) {
            row.push(<td key={`${left++}_left`}></td>);
            i++;
        }
        const arrayOfTask = tasks.filter(task => task.taskTimeDeadline.slice(0, 10) === currenDate.toJSON().slice(0, 10));
        const dateTask = [];
        for (const task of arrayOfTask) {
            dateTask.push(<DefaultTaskDisplay key={`${task.projectName}_${task.taskName}`} type="calender" task={task}/>);
        }
        const dateIterator = currenDate.getDate();
        row.push(
            <td key={currenDate.getDate()} onClick={event => {setCalenderDate(dateIterator)}}>
                <p>{currenDate.getDate()}</p>
                <ul>
                    {dateTask}
                </ul>
            </td>);

        i++;
        currenDate.setDate(currenDate.getDate() + 1);
        if (i === 7) {
            i = 0;
            tableBody.push(<tr key={`row_${numsOfRow++}`}>{row}</tr>);
            row = [];
        }
    }

    if (i !== 0) {
        i = 7 - i;
        while (i > 0) {
            row.push(<td key={`${left++}_left`}></td>);
            i--;
        }
        tableBody.push(<tr key={`row_${numsOfRow++}`}>{row}</tr>);
        row = [];
    };

    const onClickNextMonth = () => {
        setCalenderDate("");
        if (calenderMonth === 12) {
            setCalenderMonth(1);
            setCalenderYear(calenderYear => calenderYear + 1);
        }
        else {
            setCalenderMonth(calenderMonth => calenderMonth + 1);
        }
    }

    const onClickPreviousMonth = () => {
        setCalenderDate("");
        if (calenderMonth === 1) {
            setCalenderMonth(12);
            setCalenderYear(calenderYear => calenderYear - 1);
        }
        else {
            setCalenderMonth(calenderMonth => calenderMonth - 1);
        }
    }

    return (
        <>
            <h3>Calender</h3>
            <p>{calenderMonth}, {calenderYear}</p>
            <table id="calender">
                <thead>
                    <tr>
                        <td key="Sun">Sun</td>
                        <td key="Mon">Mon</td>
                        <td key="Tue">Tue</td>
                        <td key="Wed">Wed</td>
                        <td key="Thu">Thu</td>
                        <td key="Fir">Fri</td>
                        <td key="Sat">Sat</td>
                    </tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </table>
            <button onClick={onClickNextMonth}>Next</button>
            <button onClick={onClickPreviousMonth}>Previous</button>
            <DateDisplayTask date={calenderDate} month={calenderMonth} year={calenderYear} tasks={tasks}/>
        </>
    )
}

function DateDisplayTask(props) {
    const { date, month, year, tasks } =  props;
    const currentDate = new Date(`${year} ${month} ${date}`);
    if (date === "") {
        return <></>
    }

    const arrayOfTask = tasks.filter(task => task.taskTimeDeadline.slice(0, 10) === currentDate.toJSON().slice(0, 10));
    const dateListTask = [];

    if (arrayOfTask.length !== 0) {
        for (const task of arrayOfTask) {
            dateListTask.push(<DefaultTaskDisplay key={`${task.taskName}_${task.projectName}_display`} date={currentDate.toJSON()} task={task}/>)
        }
    }


    return (
        <>
            <ul>
                {dateListTask}
            </ul>
        </>
    )
}
export default Calender;