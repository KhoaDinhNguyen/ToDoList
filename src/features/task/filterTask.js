function filterTask(arrayOfTask, projectName, filter) {
    const { statusFilter } = filter;

    const taskResult = arrayOfTask.filter(task => {
        return statusFilter.includes(task.taskStatus) && task.projectName === projectName;
    });

    return taskResult;
}

export {
    filterTask
}