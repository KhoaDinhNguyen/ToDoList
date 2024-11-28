import { useState } from "react";
import "./calender.css"
import { TaskDisplay } from "./taskDisplay";

function Calender(props) {
    const { tasks } = props;
    const today = new Date();
    today.setDate(today.getDate());
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const [calenderMonth, setCalenderMonth] = useState(month);
    const [calenderYear, setCalenderYear] = useState(year);
    const [calenderDate, setCalenderDate] = useState("");

    const firstDayOfMonth = new Date(`${calenderYear} ${calenderMonth}`);
    firstDayOfMonth.setDate(firstDayOfMonth.getDate());
    
    const dateIterator = new Date(firstDayOfMonth);
    const tableBody = [];

    let dayOfWeek = 0, nonDate = 0, numsOfRow = 0, row = [];

    while (dateIterator.getMonth() === firstDayOfMonth.getMonth()) {
        while (dayOfWeek !== dateIterator.getDay()) {
            row.push(<td key={`${nonDate++}_nonDate`}></td>);
            dayOfWeek++;
        }
        const arrayOfTask = tasks.filter(task => task.taskTimeDeadline.slice(0, 10) === dateIterator.toJSON().slice(0, 10));
        const dateTask = [];

        for (const task of arrayOfTask) {
            dateTask.push(<li key={`${task.projectName}_${task.taskName}`}>{task.taskName}/{task.projectName}</li>);
        }

        const currenDate = dateIterator.getDate();
        row.push(
            <td key={currenDate} onClick={event => {setCalenderDate(currenDate)}}>
                <p>{currenDate}</p>
                <ul>
                    {dateTask}
                </ul>
            </td>
        );

        dayOfWeek++;
        dateIterator.setDate(dateIterator.getDate() + 1);

        if (dayOfWeek === 7) {
            dayOfWeek = 0;
            tableBody.push(<tr key={`row_${numsOfRow++}`}>{row}</tr>);
            row = [];
        }
    }

    if (dayOfWeek !== 0) {
        while (dayOfWeek < 7) {
            row.push(<td key={`${nonDate++}_nonDate`}></td>);
            dayOfWeek++;
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
            <p>{getMonthName(calenderMonth)}, {calenderYear}</p>
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
            dateListTask.push(<TaskDisplay key={`${task.taskName}_${task.projectName}_display`} date={currentDate.toJSON()} task={task} type="calender"/>)
        }
    }

    return (
        <>
            <ul>
                {dateListTask}
            </ul>
        </>
    );
}

function getMonthName(month) {
    const date = new Date();
    date.setDate(1);
    date.setMonth(month - 1);
    return date.toDateString().slice(4, 7);
}

export default Calender;