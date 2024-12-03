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

const updateUser = (req, res, next) => {
    const accountName = req.params.user;
    const type = req.query.type;
    if (type === 'password') {
        const { newPassword } = req.body;
        pool.query(`CALL change_password('${accountName}', '${newPassword}');`, (err, result) => {
            if (err) {
                res.status(404).json({message: err.message, error: true});
            }
            else {
                res.status(200).json({message: "Change password successfully", error: false});
            }
        });
    }
    else if(type === 'profileName') {
        const { newProfileName } = req.body;
        pool.query(`CALL change_profile_name('${accountName}', '${newProfileName}');`, (err, reuslt) => {
            if (err) {
                res.status(404).json({message: err.message, error: true});
            }
            else {
                res.status(200).json({message: "Change profile name successfully", error: false});
            }
        })
    }

}
module.exports = {
    getUserDatabase,
    updateUser
}