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
    const [currentView, setCurrentView] = useState("month");

    const firstDayOfMonth = new Date(`${calendarYear} ${calendarMonth}`);    
    const dateIterator = new Date(`${calendarYear} ${calendarMonth}`);
    const tableBody = [];

    let dayOfWeek = 0, nonDate = 0, numsOfRow = 0, row = [];

    while (dateIterator.getMonth() === firstDayOfMonth.getMonth()) {
        while (dayOfWeek !== dateIterator.getDay()) {
            row.push(<td key={`${nonDate++}_nonDate`} className="dateOfMonth"></td>);
            dayOfWeek++;
        }

        const arrayOfTask = tasks.filter(task => task.taskTimeDeadline.slice(0, 10) === convertDateToISOString(dateIterator));
        const currentDate = dateIterator.getDate();
        const currentDateString = convertDateToISOString(dateIterator);
        
        const onClickViewDateOnCalendar = () => {
            setCalendarDate(currentDate);
            setCurrentView("date");
        }

        const taskExist = arrayOfTask.length !== 0;
        row.push(
            <td key={currentDate} onClick={onClickViewDateOnCalendar} className={`dateOfMonth ${taskExist ? "taskExist" : ''} dateExist`}>
                <div className={`dateOfMonthListTask ${currentDateString === todayString ? "todayCalendar": ""} `}>
                    <h4>{currentDate}</h4>
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
            row.push(<td key={`${nonDate++}_nonDate`} className="dateOfMonth"></td>);
            dayOfWeek++;
        }
        tableBody.push(<tr key={`row_${numsOfRow++}`}>{row}</tr>);
        row = [];
    };

   
    const onClickNextMonth = () => {
        setCalendarDate("");
        setCurrentView("month");
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
        setCurrentView("month");
        if (calendarMonth === 1) {
            setCalendarMonth(12);
            setCalendarYear(calendarYear => calendarYear - 1);
        }
        else {
            setCalendarMonth(calendarMonth => calendarMonth - 1);
        }
    }

    return (
        <>
            <div className="pageActive">
                <p>To-do List Application</p>
                <h2>Calendar</h2>
            </div>
            <div id="calendarPage">
                <div id="dateDisplayTask">
                    <CalendarDisplayTask date={calendarDate} month={calendarMonth} year={calendarYear} tasks={tasks} currentView={currentView}/>
                </div>
                <div id="calendarMain">
                    <div id="calendarHeader">
                        <div>
                            <p id="calendarMonth">{getMonthNameShorthand(calendarMonth)}, {calendarYear}</p>
                        </div>
                        <div id="calendarFunction">
                            <div onClick={onClickPreviousMonth} className="calendarButton">
                                <svg width="30px" height="30px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                    <g id="SVGRepo_iconCarrier">
                                    <path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#adadad"/>
                                    </g>
                                </svg>
                            </div>
                            <div onClick={() => {setCurrentView("month")}} title="Month View" id="monthView">
                            <svg width="50px" height="50px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0">
                                <rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#e8e8e8" strokewidth="0"/>
                                </g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                <g id="SVGRepo_iconCarrier"> <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#000000" strokeWidth="0.744" strokeLinecap="round"/> </g>
                                </svg>
                            </div>
                            <div onClick={onClickNextMonth} className="calendarButton">
                                <svg width="30px" height="30px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                    <g id="SVGRepo_iconCarrier">
                                    <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill="#adadad"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <table id="calendar">
                        <thead>
                            <tr id="dateOfWeek">
                                <td key="Sun">SUN</td>
                                <td key="Mon">MON</td>
                                <td key="Tue">TUE</td>
                                <td key="Wed">WED</td>
                                <td key="Thu">THU</td>
                                <td key="Fir">FRI</td>
                                <td key="Sat">SAT</td>
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

function CalendarDisplayTask(props) {
    const {month, year, date, tasks, currentView} = props;

    console.log(date);
    if (currentView === "month") {
        return (
            <MonthDisplayTask month={month} year={year} tasks={tasks}/>
        )
    }
    else {
        return (
            <DateDisplayTask date={date} month={month} year={year} tasks={tasks}/>
        )
    }
}
function MonthDisplayTask(props) {
    const {month, year, tasks} = props;

    const arrayOfTask = tasks.filter(task => {
        const taskTimeDeadline = task.taskTimeDeadline.slice(0, 10);
        const yearTimeDeadline = taskTimeDeadline.slice(0, 4);
        const monthTimeDeadline = taskTimeDeadline.slice(5, 7);

        return month === monthTimeDeadline && year === yearTimeDeadline;
    });

    const listTaskRender = [];

    if (arrayOfTask.length !== 0) {
        for (const task of arrayOfTask) {
            listTaskRender.push(<TaskDisplay key={`${task.taskName}_${task.projectName}_display`} date={task.taskTimeDeadline} task={task} type="calendar"/>)
        }
    }

    return (
        <div>
            <p id="calendarTaskDate">{getMonthName(month)} {year}</p>
            <ul>
                {listTaskRender}
            </ul>
        </div>
    );
}
function DateDisplayTask(props) {
    const { date, month, year, tasks } =  props;
    const currentDate = new Date(`${year} ${month} ${date}`);
    console.log(date);
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
            <p id="calendarTaskDate">{currentDate.toDateString()}</p>
            <ul>
                {dateListTask}
            </ul>
        </div>
    );
}

function getMonthName(month) {

    switch (month) {
        case 1: return "January";
        case 2: return "Febuary";
        case 3: return "March";
        case 4: return "April";
        case 5: return "May";
        case 6: return "June";
        case 7: return "July";
        case 8: return "August";
        case 9: return "September";
        case 10: return "October";
        case 11: return "November";
        case 12: return "December";
        default: return "";
    }
}

function getMonthNameShorthand(month) {
    return getMonthName(month).slice(0, 3).toUpperCase();
}
export default Calendar;