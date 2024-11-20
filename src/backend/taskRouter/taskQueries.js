const pool = require('../database');

const updateTask = (req, res, next) => {
    const username = req.params.user;
    const {project_name, task_name} = req.body;
    const type = req.params.type;

    pool.query(`CALL ${type}_task('${username}', '${project_name}', '${task_name}');`, (err, result) => {
        if (err) {
            res.status(400).json({message: err.message, error: true});
        }
        else {
            res.status(200).json({message: 'Update task sucessfully'});
        }
    });
}

const createTask = (req, res, next) => {
    const username = req.params.user;
    const {task_name, project_name, task_description, date_created, date_deadline} = req.body;

    pool.query(`CALL create_task('${task_name}', '${project_name}', '${username}', '${task_description}', '${date_created}', '${date_deadline}');`, (err, result) => {
        if (err) {
            res.status(400).json({message: err.message, error: true});
        }
        else {
            res.status(200).json({message: 'Create task sucessfully'});
        }
    })
}

const deleteTask = (req, res, next) => {
    const username = req.params.user;
    const {task_name, project_name} = req.query;
    
    pool.query(`CALL delete_task('${task_name}', '${project_name}', '${username}');`, (err, result) => {
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