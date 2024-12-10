function sortTask(tasks, sort) {
    const { sortTimeCreated, sortTaskName, sortTimeDeadline} = sort;

    for (let i = 1; i < tasks.length && sortTimeDeadline !== undefined; ++i) {
        const key = tasks[i];
        let j = i - 1;
        while (j >= 0 && compareValue(sortTimeDeadline, key.taskTimeDeadline.slice(0, 10), tasks[j].taskTimeDeadline.slice(0, 10))) {
            tasks[j + 1] = tasks[j];
            j--;
        }
        tasks[j + 1] = key;
    }
    
    for (let i = 1; i < tasks.length && sortTimeCreated !== undefined; ++i) {
        const key = tasks[i];
        let j = i - 1;
        while (j >= 0 && compareValue(sortTimeCreated, key.taskTimeCreated.slice(0, 10), tasks[j].taskTimeCreated.slice(0, 10))) {
            tasks[j + 1] = tasks[j];
            j--;
        }
        tasks[j + 1] = key;
    }

    for (let i = 1; i < tasks.length && sortTaskName !== undefined; ++i) {
        const key = tasks[i];
        let j = i - 1;
        while (j >= 0 && compareValue(sortTaskName, key.taskName, tasks[j].taskName)) {
            tasks[j + 1] = tasks[j];
            j--;
        }
        tasks[j + 1] = key;
    }



    return tasks;
}

function compareValue(asc, val1, val2) {
    if (asc) {
        return val1.toUpperCase() < val2.toUpperCase();
    }
    else{
        return val1.toUpperCase() > val2.toUpperCase();
    }
}
export {
    sortTask
}