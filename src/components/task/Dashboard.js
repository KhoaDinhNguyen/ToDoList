import { TaskDisplay, dateDisplay } from "./taskDisplay";

function Dashboard(props) {
    const { tasks } = props;
    if (tasks.length === 0) {return <p>Nothing has planned yet</p>;}

    let minTimeDeadline = tasks[0].taskTimeDeadline, maxTimeDeadline = tasks[0].taskTimeDeadline;

    for (const task of tasks) {
        const timeDeadline = task.taskTimeDeadline;
        if (timeDeadline < minTimeDeadline) minTimeDeadline = timeDeadline;
        if (timeDeadline > maxTimeDeadline) maxTimeDeadline = timeDeadline;
    }

    const minDateDeadline = new Date(minTimeDeadline);
    minDateDeadline.setDate(minDateDeadline.getDate());
    const maxDateDeadline = new Date(maxTimeDeadline);
    maxDateDeadline.setDate(maxDateDeadline.getDate());

    const beforeMinDateDeadline = new Date(minDateDeadline.toISOString().slice(0, 10));
    const afterMaxDateDeadLine = new Date(maxDateDeadline.toISOString().slice(0, 10));
    let nonDeadlineStartDate = undefined;
    let nonDeadlineEndDate = undefined;

    beforeMinDateDeadline.setDate(minDateDeadline.getDate() - 1);
    afterMaxDateDeadLine.setDate(maxDateDeadline.getDate() + 1);

    const dateListTask = [];

    for (let currentDate = new Date(minDateDeadline.toISOString().slice(0, 10)); currentDate <=  maxDateDeadline; currentDate.setDate(currentDate.getDate() + 1)) {
        currentDate.setDate(currentDate.getDate());
        const arrayOfTask = tasks.filter(task => task.taskTimeDeadline === currentDate.toISOString().slice(0, 10));

        if (arrayOfTask.length !== 0) {
            //console.log(arrayOfTask);
            if (nonDeadlineStartDate !== undefined) {
                dateListTask.push(
                    <li key={dateDisplay(nonDeadlineStartDate)}>
                        <NotDeadlineDisplay startDate={dateDisplay(nonDeadlineStartDate)} endDate={dateDisplay(nonDeadlineEndDate)}/>
                    </li>
                );
                nonDeadlineStartDate = undefined;
                nonDeadlineEndDate = undefined;
            }
            //console.log(currentDate.toISOString().slice(0, 10));
            dateListTask.push(<li key={currentDate}><DeadlineDisplay tasks={arrayOfTask} date={dateDisplay(currentDate)}/></li>);
        }
        else {
            if (nonDeadlineStartDate === undefined) { 
                nonDeadlineStartDate = new Date(currentDate);
                nonDeadlineEndDate = new Date(currentDate); 
            }
            else { 
                nonDeadlineEndDate = new Date(currentDate); 
            }
        }
    }

    //console.log(typeof(minDateDeadline));
    return (
        <>
            <p>This is dashboard</p>
            <ul>
                <li>
                    <p>Before - {dateDisplay(beforeMinDateDeadline)}</p>
                    <p>Nothing planned yet</p>
                </li>
                {dateListTask}
                <li>
                    <p>{dateDisplay(afterMaxDateDeadLine)} - After</p>
                    <p>Nothing planned yet</p>
                </li>
            </ul>
        </>
    );
}

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
}

function DeadlineDisplay(props) {
    const {tasks, date} = props;
    const listTask = [];
    
    for (const task of tasks) {
        listTask.push(<TaskDisplay key={`${task.projectName}${task.taskName}`} task={task} type="dashboard"/>)
    }

    return (
        <>
            <p>{date}</p>
            <ul>
                {listTask}
            </ul>
        </>
    )
}

export default Dashboard;