function countTask(tasks) {
    let [numOfPendingTask, numOfFulfilledTask, numOfFailingTask] = [0, 0, 0];

    tasks.forEach(task => {
        const { taskStatus } = task;
        //console.log(taskStatus);
        if (taskStatus === 'pending') numOfPendingTask++;
        else if (taskStatus === 'fulfilled') numOfFulfilledTask++;
        else numOfFailingTask++;
    });

    return [numOfPendingTask, numOfFulfilledTask, numOfFailingTask];
}

export {
    countTask
}