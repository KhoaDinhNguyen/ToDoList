/*
    returns task which its name contains substring 
    @param tasks - list of tasks
    @param {string} searchString - a substring that tasks' name must have
    
    @return satisfied tasks

    Note: 
    - uppercase characers do not affect the result (task === TaSK)
*/

function searchTask(tasks, searchString) {
    searchString = searchString.toUpperCase();

    return tasks.filter(task => {
        const { taskName } = task;
        return taskName.toUpperCase().includes(searchString);
    });
}

export {
    searchTask
}