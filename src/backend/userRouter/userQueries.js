const pool = require('../database');

const getUserDatabase = (req, res, next) => {
    const accountName = req.params.user;
    pool.query(`SELECT * FROM user_project_task WHERE user_account = '${accountName}';`, (err, result) => {
        if (err) {
            throw err;
        }
        const database = []; 
        for (const data of result.rows) {
            database.push({
                accountName: data.user_account,
                profileName: data.full_name,
                projectName: data.project_name,
                projectDescription: data.project_description,
                projectTimeCreated: data.project_time_created,
                taskName: data.task_name,
                taskDescription: data.task_description,
                taskStatus: data.status,
                taskTimeCreated: data.task_time_created,
                taskTimeDeadline: data.task_deadline
            });
        };

        res.status(200).json(database);
    });
}

module.exports = {
    getUserDatabase
}