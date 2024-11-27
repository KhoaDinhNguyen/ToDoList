function filterTask(arrayOfTask, projectName, filter) {
    const { statusFilter, dateFilter } = filter;
    const { timeCreatedFrom, timeCreatedTo, timeDeadlineFrom, timeDeadlineTo} = dateFilter;

    const taskResult = arrayOfTask.filter(task => {
        if (task.projectName !== projectName) return false;
        if (timeCreatedFrom !== "" && task.taskTimeCreated.slice(0,10) < timeCreatedFrom) return false;
        if (timeCreatedTo !== "" && task.taskTimeCreated.slice(0,10) > timeCreatedTo) return false;
        if (timeDeadlineFrom !== "" && task.taskTimeDeadline.slice(0,10) < timeDeadlineFrom) return false;
        if (timeDeadlineTo !== "" && task.taskTimeDeadline.slice(0,10) > timeDeadlineTo) return false;

        return statusFilter.includes(task.taskStatus);
    });

    return taskResult;
}

export {
    filterTask
}