function searchTask(tasks, searchString) {
    searchString = searchString.toUpperCase();

    return tasks.filter(task => {
        return task.taskName.toUpperCase().includes(searchString);
    });
}

export {
    searchTask
}