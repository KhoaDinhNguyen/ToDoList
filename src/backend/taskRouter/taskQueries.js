const pool = require('../database');

const updateTask = (req, res, next) => {
    const accountName = req.params.user;
    const {projectName, taskName} = req.body;
    const type = req.params.type;
    pool.query(`CALL ${type}_task('${accountName}', '${projectName}', '${taskName}');`, (err, result) => {
        if (err) {
            res.status(400).json({message: err.message, error: true});
        }
        else {
            res.status(200).json({message: 'Update task sucessfully'});
        }
    });
}

const createTask = (req, res, next) => {
    const accountName = req.params.user;
    const {taskName, projectName, taskDescription, taskTimeDeadline} = req.body;

    pool.query(`CALL create_task('${taskName}', '${projectName}', '${accountName}', '${taskDescription}', '${taskTimeDeadline}');`, (err, result) => {
        if (err) {
            res.status(400).json({message: err.message, error: true});
        }
        else {
            res.status(200).json({message: 'Create task sucessfully'});
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
            res.status(200).json({message: 'Delete task sucessfully'});
        }
    })
}

module.exports = {
    updateTask,
    createTask,
    deleteTask
};