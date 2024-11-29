function filterTask(tasks, projectName, filter) {
    const { statusFilter, dateFilter, importantFilter } = filter;
    const { timeCreatedFrom, timeCreatedTo, timeDeadlineFrom, timeDeadlineTo} = dateFilter;

    const taskResult = tasks.filter(task => {
        if (task.projectName !== projectName) return false;
        if (timeCreatedFrom !== "" && task.taskTimeCreated < timeCreatedFrom) return false;
        if (timeCreatedTo !== "" && task.taskTimeCreated > timeCreatedTo) return false;
        if (timeDeadlineFrom !== "" && task.taskTimeDeadline < timeDeadlineFrom) return false;
        if (timeDeadlineTo !== "" && task.taskTimeDeadline > timeDeadlineTo) return false;
        if (importantFilter === true && task.taskImportant === false) return false
        return statusFilter.includes(task.taskStatus);
    });

    return taskResult;
}

export {
    filterTask
}