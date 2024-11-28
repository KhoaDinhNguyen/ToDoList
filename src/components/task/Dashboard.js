import { TaskDisplay } from "./taskDisplay";

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

    const beforeMinDateDeadline = new Date(minDateDeadline.toDateString());
    const afterMaxDateDeadLine = new Date(maxDateDeadline.toDateString());
    let nonDeadlineStartDate = undefined;
    let nonDeadlineEndDate = undefined;

    beforeMinDateDeadline.setDate(minDateDeadline.getDate() - 1);
    afterMaxDateDeadLine.setDate(maxDateDeadline.getDate() + 1);

    const dateListTask = [];

    for (let currentDate = new Date(minDateDeadline); currentDate <=  maxDateDeadline; currentDate.setDate(currentDate.getDate() + 1)) {
        currentDate.setDate(currentDate.getDate());
        const arrayOfTask = tasks.filter(task => task.taskTimeDeadline === currentDate.toJSON());
        if (arrayOfTask.length !== 0) {
            if (nonDeadlineStartDate !== undefined) {
                dateListTask.push(
                    <li key={nonDeadlineStartDate.toDateString()}>
                        <NotDeadlineDisplay startDate={nonDeadlineStartDate.toDateString()} endDate={nonDeadlineEndDate.toDateString()}/>
                    </li>
                );
                nonDeadlineStartDate = undefined;
                nonDeadlineEndDate = undefined;
            }

            dateListTask.push(<li key={currentDate}><DeadlineDisplay tasks={arrayOfTask} date={currentDate.toJSON()}/></li>);
        }
        else {
            if (nonDeadlineStartDate === undefined) { nonDeadlineStartDate = new Date(currentDate); }
            else { nonDeadlineEndDate = new Date(currentDate); }
        }
    }

    return (
        <>
            <p>This is dashboard</p>
            <ul>
                <li>
                    <p>Before - {beforeMinDateDeadline.toDateString()}</p>
                    <p>Nothing planned yet</p>
                </li>
                {dateListTask}
                <li>
                    <p>{afterMaxDateDeadLine.toDateString()} - After</p>
                    <p>Nothing planned yet</p>
                </li>
            </ul>
        </>
    );
}

function NotDeadlineDisplay(props) {
    const { startDate, endDate } = props;

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
            <p>{new Date(date).toDateString()}</p>
            <ul>
                {listTask}
            </ul>
        </>
    )
}

export default Dashboard;