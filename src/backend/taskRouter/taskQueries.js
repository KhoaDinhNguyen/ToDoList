const pool = require('../database');

const updateTask = (req, res, next) => {
    const accountName = req.params.user;
    const type = req.params.type;

    if (type === 'pending' || type === 'fulfilled') {
        const {projectName, taskName} = req.body;
        pool.query(`CALL ${type}_task('${accountName}', '${projectName}', '${taskName}');`, (err, result) => {
            if (err) {
                res.status(400).json({message: err.message, error: true});
            }
            else {
                res.status(200).json({message: 'Update task sucessfully'});
            }
        });
    }
    else if (type === 'important') {
        const { projectName, taskName, newImportantStatus } = req.body;
        pool.query(`CALL update_task_important('${taskName}', '${projectName}', '${accountName}', '${newImportantStatus}');`, (err, result) => {
            if (err) {
                res.status(400).json({message: err.message, error: true});
            }
            else {
                res.status(200).json({message: 'Update task sucessfully'});
            }
        });
    }
    else if (type === "info") {
        const { projectName, taskName, newTaskName, newTaskDescription, newTaskTimeDeadline } = req.body;
        pool.query(`CALL update_task_info('${taskName}', '${projectName}', '${accountName}', '${newTaskName}', '${newTaskDescription}', '${newTaskTimeDeadline}');`, (err, result) => {
            if (err) {
                if (err.message === 'duplicate key value violates unique constraint "tasks_pkey"') {
                    res.status(400).json({message: 'Duplicate task name in the same project', error: true});
                }
                else {
                    res.status(400).json({message: err.message, error: true});
                }
            }
            else {
                res.status(200).json({message: 'Update task sucessfully'});
            }
        });
    }

}

const createTask = (req, res, next) => {
    const accountName = req.params.user;
    const {taskName, projectName, taskDescription, taskTimeDeadline} = req.body;

    pool.query(`CALL create_task('${taskName}', '${projectName}', '${accountName}', '${taskDescription}', '${taskTimeDeadline}');`, (err, result) => {
        if (err) {
            if (err.message === 'duplicate key value violates unique constraint "tasks_pkey"') {
                res.status(400).json({message: "Task duplicated", error: true});
            }
            else {
                res.status(400).json({message: err.message, error: true});
            }
        }
        else {
            res.status(200).json({message: 'Create task sucessfully', error: false});
        }
    })
}

const deleteTask = (req, res, next) => {
    const accountName = req.params.user;
    const {taskName, projectName} = req.query;
    
    pool.query(`CALL delete_task('${taskName}', '${projectName}', '${accountName}');`, (err, result) => {
        if (err) {
            res.status(400).json({message: err.message, error: true});
        }
        else {
            res.status(200).json({message: 'Delete task sucessfully', error: false});
        }
    })
}

module.exports = {
    updateTask,
    createTask,
    deleteTask
};