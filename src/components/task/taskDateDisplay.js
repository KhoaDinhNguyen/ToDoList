import { DefaultTaskDisplay } from "./taskDisplay";

function TaskDateDisplay(props) {
    const {tasks, date} = props;
    const listTask = [];
    for (const task of tasks) {
        listTask.push(<DefaultTaskDisplay key={`${task.projectName}${task.taskName}`} task={task} type={"dashboard"}/>)
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

export default TaskDateDisplay;