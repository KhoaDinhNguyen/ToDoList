import { useState } from "react";
import "./calender.css"
import { TaskDisplay } from "./taskDisplay";
import { convertDateToISOString } from "../../app/user/User";

function Calendar(props) {
    const { tasks } = props;
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const todayString = convertDateToISOString(today);

    const [calendarMonth, setCalendarMonth] = useState(month);
    const [calendarYear, setCalendarYear] = useState(year);
    const [calendarDate, setCalendarDate] = useState("");

    const firstDayOfMonth = new Date(`${calendarYear} ${calendarMonth}`);    
    const dateIterator = new Date(`${calendarYear} ${calendarMonth}`);
    const tableBody = [];

    let dayOfWeek = 0, nonDate = 0, numsOfRow = 0, row = [];

    while (dateIterator.getMonth() === firstDayOfMonth.getMonth()) {
        while (dayOfWeek !== dateIterator.getDay()) {
            row.push(<td key={`${nonDate++}_nonDate`} className="dateOfMonth" onClick={() => {setCalendarDate("")}}></td>);
            dayOfWeek++;
        }

        const arrayOfTask = tasks.filter(task => task.taskTimeDeadline.slice(0, 10) === convertDateToISOString(dateIterator));
        const dateTask = [];
        const currentDate = dateIterator.getDate();
        const currentDateString = convertDateToISOString(dateIterator);
        
        for (const task of arrayOfTask) {
            const {projectName, taskName, taskStatus} = task;
    
            dateTask.push(<li key={`${projectName}_${taskName}`}><p className={`calendarTask ${todayString > currentDateString ? (taskStatus === 'fulfilled' ? 'calendarFulfilled' : 'calendarFailing'): '' }`}>{taskName}</p></li>);
        }

        row.push(
            <td key={currentDate} onClick={() => {setCalendarDate(currentDate);}} className="dateOfMonth">
                <div className={`dateOfMonthListTask ${currentDateString === todayString ? "todayCalendar": ""}`}>
                    <h4>{currentDate}</h4>
                    <ul>
                        {dateTask}
                    </ul>
                </div>
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
            row.push(<td key={`${nonDate++}_nonDate`} className="dateOfMonth" onClick={() => setCalendarDate("")}></td>);
            dayOfWeek++;
        }
        tableBody.push(<tr key={`row_${numsOfRow++}`}>{row}</tr>);
        row = [];
    };

   
    const onClickNextMonth = () => {
        setCalendarDate("");
        if (calendarMonth === 12) {
            setCalendarMonth(1);
            setCalendarYear(calendarYear => calendarYear + 1);
        }
        else {
            setCalendarMonth(calendarMonth => calendarMonth + 1);
        }
    }

    const onClickPreviousMonth = () => {
        setCalendarDate("");
        if (calendarMonth === 1) {
            setCalendarMonth(12);
            setCalendarYear(calendarYear => calendarYear - 1);
        }
        else {
            setCalendarMonth(calendarMonth => calendarMonth - 1);
        }
    }

    return (
        <div id="calendarPage">
            <h3>Calendar</h3>
            <div id="calendarHeader">
                <p onClick={onClickPreviousMonth} className="calendarButton">&#x3C;</p>
                <p id="calendarMonth">{getMonthName(calendarMonth)}, {calendarYear}</p>
                <p onClick={onClickNextMonth} className="calendarButton">&#x3E;</p>
            </div>
            <table id="calendar">
                <thead>
                    <tr id="dateOfWeek">
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
            <div id="dateDisplayTask">
                <DateDisplayTask date={calendarDate} month={calendarMonth} year={calendarYear} tasks={tasks}/>
            </div>
        </div>
    )
}

function DateDisplayTask(props) {
    const { date, month, year, tasks } =  props;
    const currentDate = new Date(`${year} ${month} ${date}`);
    if (date === "") {
        return <></>;
    }

    const arrayOfTask = tasks.filter(task => task.taskTimeDeadline.slice(0, 10) === convertDateToISOString(currentDate));
    const dateListTask = [];

    if (arrayOfTask.length !== 0) {
        for (const task of arrayOfTask) {
            dateListTask.push(<TaskDisplay key={`${task.taskName}_${task.projectName}_display`} date={currentDate.toJSON()} task={task} type="calendar"/>)
        }
    }

    return (
        <div>
            <p>{currentDate.toDateString()}</p>
            <ul>
                {dateListTask}
            </ul>
        </div>
    );
}

function getMonthName(month) {
    const date = new Date();
    date.setDate(1);
    date.setMonth(month - 1);
    return date.toDateString().slice(4, 7);
}

export default Calendar;