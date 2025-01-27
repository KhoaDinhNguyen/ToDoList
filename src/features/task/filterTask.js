/* 
    filters list of tasks based on parameter
    @param tasks - list of tasks
    @param {string} filterProjectName - tasks' project's name
    @param {[string]} filterStatus - tasks's status (pending, fulfilled, failing)
    @param {boolean} filterImportant - task's important
    @param {string} filterTimeCreatedFrom - greater than task's created time
    @param {string} filterTimeCreatedTo - lesser than task's created time
    @param {string} filterTimeDeadlineFrom - greater than task's deadline
    @param {string} filterTimeDeadlineTo - lesser than task's deadline
    
    @return a filtered list
*/

function filterTask(tasks, filterProjectName, filterStatus, filterImportant, filterTimeCreatedFrom, filterTimeCreatedTo, filterTimeDeadlineFrom, filterTimeDeadlineTo) {
    const taskResult = tasks.filter(task => {
        const {projectName, taskTimeCreated, taskTimeDeadline, taskImportant, taskStatus} = task;

        if (projectName !== filterProjectName) return false;
        if (filterTimeCreatedFrom !== "" && taskTimeCreated < filterTimeCreatedFrom) return false;
        if (filterTimeCreatedTo !== "" && taskTimeCreated > filterTimeCreatedTo) return false;
        if (filterTimeDeadlineFrom !== "" && taskTimeDeadline < filterTimeDeadlineFrom) return false;
        if (filterTimeDeadlineTo !== "" && taskTimeDeadline > filterTimeDeadlineTo) return false;
        if (filterImportant === true && taskImportant === false) return false
        return filterStatus.includes(taskStatus);
    });

    return taskResult;
}

export {
    filterTask
}