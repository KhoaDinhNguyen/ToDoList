import { TaskDisplay } from "./taskDisplay";
import './Dashboard.css';
import { useState } from "react";
import { convertFromBooleanToDisplay, convertDateToISOString } from "../../app/user/User";

function Dashboard(props) {
    const { tasks } = props;
    if (tasks.length === 0) {return <p>Nothing has planned yet</p>;}

    let minTimeDeadline = tasks[0].taskTimeDeadline, maxTimeDeadline = tasks[0].taskTimeDeadline;
    const today = new Date();

    const todayString = convertDateToISOString(today);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = convertDateToISOString(tomorrow);

    for (const task of tasks) {
        const timeDeadline = task.taskTimeDeadline;
        if (timeDeadline < minTimeDeadline) minTimeDeadline = timeDeadline;
        if (timeDeadline > maxTimeDeadline) maxTimeDeadline = timeDeadline;
    }
    const minDateDeadline = new Date(minTimeDeadline);
    const minDateDeadlineString = convertDateToISOString(minDateDeadline);

    const maxDateDeadline = new Date(maxTimeDeadline);
    const maxDateDeadlineString = convertDateToISOString(maxDateDeadline);

    let dateListTask = [];

    const startDate = todayString < minDateDeadlineString ? todayString : minDateDeadlineString;
    const endDate = tomorrowString > maxDateDeadlineString ? tomorrow : maxDateDeadline;

    for (let currentDate = new Date(startDate); currentDate <=  endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        const currentDateString = convertDateToISOString(currentDate);
        const arrayOfTask = tasks.filter(task => task.taskTimeDeadline.slice(0, 10) === currentDateString);

        if (arrayOfTask.length !== 0) {
            dateListTask.push(<li key={currentDate}><DeadlineDisplay tasks={arrayOfTask} date={currentDateString} finish={currentDate < today} today={todayString === currentDateString} tomorrow={tomorrowString === currentDateString}/></li>);
        }
        else if (todayString === currentDateString) {
            dateListTask.push(<li key={todayString}><NotDeadlineDisplay today={true}/></li>);
        }
        else if (tomorrowString === currentDateString) {
            dateListTask.push(<li key={tomorrowString}><NotDeadlineDisplay tomorrow={true}/></li>);
        }
    }

    return (
        <div id="dashboard">
            <div id="dashboardHeader">
                <h3>Dashboard - Today: {today.toDateString()}</h3>
            </div>
            <div id="dashboardBody">
                <ul>
                    {dateListTask}
                </ul>
            </div>
        </div>
    );
}

function DeadlineDisplay(props) {
    const {tasks, date, finish, today, tomorrow} = props;
    const listTask = [];
    const [taskDisplay, setTaskDisplay] = useState(!finish);

    for (const task of tasks) {
        listTask.push(<TaskDisplay key={`${task.projectName}${task.taskName}`} task={task} type="dashboard"/>)
    }

    const numsOfTask = tasks.length;
    const toggleTaskDisplay = () =>  { setTaskDisplay(!taskDisplay); };

    return (
        <div className="deadlineTask">
            <p className="dashboardDate">{date} {today ? "(Today)" : (tomorrow ? "(Tomorrow)": "")}</p>
            <p className="openFinishedTasks" style={{display : convertFromBooleanToDisplay(!taskDisplay && finish)}} onClick={toggleTaskDisplay}>Show {numsOfTask} finised task(s)</p>
            <ul className="listDeadlineTask" style={{display : convertFromBooleanToDisplay(taskDisplay)}}>
                {listTask}
            </ul>
            <p className="openFinishedTasks" style={{display : convertFromBooleanToDisplay(taskDisplay && finish)}} onClick={toggleTaskDisplay}>Close task(s)</p>
        </div>
    )
}

export default Dashboard;

function NotDeadlineDisplay(props) {
    const { today, tomorrow } = props;

    return (
        <div>
            <p className="dashboardDate">{today ? "Today" : (tomorrow ? "Tomorrow": "")}</p>
            <div className="nothingPlan">
                <p>Nothing planned yet</p>
            </div>
        </div>
    )
}

/*

function NotDeadlineDisplay(props) {
    const { startDate, endDate } = props;

    if (startDate === endDate) {
        return (
            <>
                <p>{startDate}</p>
                <p>Nothing planned yet</p>
            </>
        )
    }
    return (
        <>
            <p>{startDate} - {endDate}</p>
            <p>Nothing planned yet</p>
        </>
    );

    <li key={dateDisplay(nonDeadlineStartDate)}>
        <NotDeadlineDisplay startDate={dateDisplay(nonDeadlineStartDate)} endDate={dateDisplay(nonDeadlineEndDate)}/>
    </li>
}*/