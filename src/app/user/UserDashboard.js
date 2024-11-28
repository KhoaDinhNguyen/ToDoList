import { tasksSlice } from "../../features/user/databaseSlice";
import TaskDateDisplay from "../../components/task/taskDateDisplay";
import { useSelector } from "react-redux";

function UserDashboard() {
    const tasks = useSelector(state => state[tasksSlice.name]);

    if (tasks.length === 0) return  <p>Nothing has planned yet</p>;

    let minTimeDeadline = tasks[0].taskTimeDeadline;
    let maxTimeDeadline = tasks[0].taskTimeDeadline;;
    
    for (const task of tasks) {
        const timeDeadline = task.taskTimeDeadline;
        if (timeDeadline < minTimeDeadline) minTimeDeadline = timeDeadline;
        if (timeDeadline > maxTimeDeadline) maxTimeDeadline = timeDeadline;
    }

    const dateListTask = [];
    const minDateDeadline = new Date(minTimeDeadline);
    const maxDateDeadline = new Date(maxTimeDeadline);


    for (let currentDate = new Date(minDateDeadline), i = 1; currentDate <=  maxDateDeadline; i++) {
        currentDate.setDate(currentDate.getDate() + 1);
        const arrayOfTask = tasks.filter(task => task.taskTimeDeadline === currentDate.toJSON());
        if (arrayOfTask.length !== 0) {
            dateListTask.push(<TaskDateDisplay tasks={arrayOfTask} key={currentDate} date={currentDate.toJSON()}/>)
        }
    }
    return (
        <>
            <p>This is dashboard</p>
            <ul>
                {dateListTask}
            </ul>

        </>
    )
}

export default UserDashboard;