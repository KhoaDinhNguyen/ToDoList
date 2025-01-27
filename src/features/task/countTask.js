/*
    counts the number of pending, fulfilled, failing tasks in the given list
    @param tasks: a list of task

    @return an array with the number of pending, fulfilled, failing tasks, respectively.
*/
function countTask(tasks) {
    let [numOfPendingTask, numOfFulfilledTask, numOfFailingTask] = [0, 0, 0];

    tasks.forEach(task => {
        const { taskStatus } = task;
        if (taskStatus === 'pending') numOfPendingTask++;
        else if (taskStatus === 'fulfilled') numOfFulfilledTask++;
        else numOfFailingTask++;
    });

    return [numOfPendingTask, numOfFulfilledTask, numOfFailingTask];
}

export {
    countTask
}