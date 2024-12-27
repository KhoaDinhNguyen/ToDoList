import { convertDateToISOString } from "../../app/user/User";

function splitTask(tasks) {
    const today = new Date();
    const todayString = convertDateToISOString(today);

    const finishedTask = [];
    const unfinishedTask = [];

    tasks.forEach(task => {
        //console.log(task.taskTimeDeadline);
        const { taskTimeDeadline} = task;
        const taskTimeDeadlineString = taskTimeDeadline.slice(0, 10);
        //console.log(taskTimeDeadlineString);

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