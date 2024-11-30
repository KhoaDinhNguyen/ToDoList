const pool = require('../database');

const getUserDatabase = (req, res, next) => {
    const accountName = req.params.user;
    pool.query(`SELECT * FROM user_project_task WHERE user_account = '${accountName}';`, (err, result) => {
        if (err) {
            throw err;
        }
        const database = []; 
        for (const data of result.rows) {
            const { user_account, full_name, project_name, project_description, project_time_created, task_name, task_description, status, task_time_created, task_deadline, important} = data;
            if (task_name === null) {
                database.push({
                    accountName: user_account,
                    profileName: full_name,
                    projectName: project_name,
                    projectDescription: project_description,
                    projectTimeCreated: project_time_created.toISOString().slice(0, 10),
                    taskName: task_name,
                    taskDescription: task_description,
                    taskStatus: status,
                    taskTimeCreated: "",
                    taskTimeDeadline: "",
                    taskImportant: important
                });
            }
            else {
                database.push({
                    accountName: user_account,
                    profileName: full_name,
                    projectName: project_name,
                    projectDescription: project_description,
                    projectTimeCreated: project_time_created.toISOString().slice(0, 10),
                    taskName: task_name,
                    taskDescription: task_description,
                    taskStatus: status,
                    taskTimeCreated: task_time_created.toISOString().slice(0, 10),
                    taskTimeDeadline: task_deadline.toISOString().slice(0, 10),
                    taskImportant: important
                });
            }
        };

        res.status(200).json(database);
    });
}

module.exports = {
    getUserDatabase
}