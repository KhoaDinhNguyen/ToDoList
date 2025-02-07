/* 
    sorts list of tasks based on parameter
    @param tasks - list of tasks
    @param {boolean} sortTaskName - tasks' name
    @param {boolean} sortTimeCreated - tasks' created time
    @param {boolean} sortTimeDeadline - tasks' deadline
    
    @return a sorted list
    
    Note: 
    - The boolean parameter true if sort ascending, false if sort descending, and null if no need to sort
    - The priority: sortTimeDeadline > sortTaskTime > sortTimeCreated
    - uppercase characers do not affect the sorting (task === TaSK)
*/

function sortTask(tasks, sortTaskName, sortTimeCreated, sortTimeDeadline) {
    for (let i = 1; i < tasks.length; ++i) {
        const key = tasks[i];
        let j = i - 1;
        while (j >= 0 && compareTask(key, tasks[j], sortTaskName, sortTimeCreated, sortTimeDeadline)) {
            tasks[j + 1] = tasks[j];
            j--;
        }
        tasks[j + 1] = key;
    }

    return tasks;
}

/* 
    compares two tasks
    @param key - task that is need to find correct position
    @param other - task that is used to compared 
    @param {boolean} sortTaskName - sort task based on tasks' name
    @param {boolean} sortTimeCreated - sort task based on tasks' created time
    @param {boolean} sortTimeDeadline - sort task based on tasks' deadline
    
    @return true key is still not in correct position, otherwise return false
    
    Note: 
    - The boolean parameter true if sort ascending, false if sort descending, and null if no need to sort
    - The priority: sortTimeDeadline > sortTaskTime > sortTimeCreated
    - uppercase characers do not affect the sorting (task === TaSK)
*/
function compareTask(key, other, sortTaskName, sortTimeCreated, sortTimeDeadline) {
    if (sortTimeDeadline !== null) {
        if (key.taskTimeDeadline.slice(0, 10) !== other.taskTimeDeadline.slice(0, 10)) {
            if (sortTimeDeadline) {
                return key.taskTimeDeadline.slice(0, 10) < other.taskTimeDeadline.slice(0, 10);
            }
            else {
                return key.taskTimeDeadline.slice(0, 10) > other.taskTimeDeadline.slice(0, 10);
            }
        }
    }
    if (sortTaskName !== null) {
        if (key.taskName.toUpperCase() !== other.taskName.toUpperCase()) {
            if (sortTaskName) {
                return key.taskName.toUpperCase() < other.taskName.toUpperCase();
            }
            else {
                return key.taskName.toUpperCase() > other.taskName.toUpperCase();
            }
        }
    }
    if (sortTimeCreated !== null) {
        if (key.taskTimeCreated.slice(0, 10) !== other.taskTimeCreated.slice(0, 10)) {
            if (sortTimeCreated) {
                return key.taskTimeCreated.slice(0, 10) < other.taskTimeCreated.slice(0, 10);
            }
            else {
                return key.taskTimeCreated.slice(0, 10) > other.taskTimeCreated.slice(0, 10);
            }
        }
    }

    return false;
}
export {
    sortTask
}