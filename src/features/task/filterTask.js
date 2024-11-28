function filterTask(tasks, projectName, filter) {
    const { statusFilter, dateFilter, importantFilter } = filter;
    const { timeCreatedFrom, timeCreatedTo, timeDeadlineFrom, timeDeadlineTo} = dateFilter;

    const taskResult = tasks.filter(task => {
        if (task.projectName !== projectName) return false;
        if (timeCreatedFrom !== "" && task.taskTimeCreated.slice(0,10) < timeCreatedFrom) return false;
        if (timeCreatedTo !== "" && task.taskTimeCreated.slice(0,10) > timeCreatedTo) return false;
        if (timeDeadlineFrom !== "" && task.taskTimeDeadline.slice(0,10) < timeDeadlineFrom) return false;
        if (timeDeadlineTo !== "" && task.taskTimeDeadline.slice(0,10) > timeDeadlineTo) return false;
        if (importantFilter === true && task.taskImportant === false) return false
        return statusFilter.includes(task.taskStatus);
    });

    return taskResult;
}

export {
    filterTask
}