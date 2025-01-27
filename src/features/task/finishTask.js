/*
    Helper functions
*/
// convertDateToISOString(Date) -> "YYYY-MM-DD"
import { convertDateToISOString } from "../../app/user/User";

/*
    Seperate a list of tasks into two lists of tasks (finished and unfinished)
    @param tasks: list of tasks

    @return an array with two elements, finished tasks and unfinishedTask, respectively.
*/
function splitTask(tasks) {
    const today = new Date();
    const todayString = convertDateToISOString(today);

    const finishedTask = [];
    const unfinishedTask = [];

    tasks.forEach(task => {
        const { taskTimeDeadline} = task;
        const taskTimeDeadlineString = taskTimeDeadline.slice(0, 10);
        if (taskTimeDeadlineString < todayString) {
            finishedTask.push(task);
        }
        else {
            unfinishedTask.push(task);
        }
    });

    return [finishedTask, unfinishedTask];
}

export {
    splitTask
}