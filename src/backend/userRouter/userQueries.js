const pool = require('../database');

const getUserDatabase = (req, res, next) => {
    const accountName = req.params.user;
    pool.query(`SELECT * FROM get_user_database('${accountName}');`, (err, result) => {
        if (err) {
            throw err;
        }
        const database = []; 
        //console.log(result.rows);
        for (const data of result.rows) {
            const { accountname, profilename, projectname, projectdescription, projecttimecreated, taskname, taskdescription, taskstatus, tasktimecreated, tasktimedeadline, important} = data;
            if (taskname === null) {
                database.push({
                    accountName: accountname,
                    profileName: profilename,
                    projectName: projectname,
                    projectDescription: projectdescription,
                    projectTimeCreated: projecttimecreated.toISOString().slice(0, 10),
                    taskName: taskname,
                    taskDescription: taskdescription,
                    taskStatus: taskstatus,
                    taskTimeCreated: "",
                    taskTimeDeadline: "",
                    taskImportant: important
                });
            }
            else {
                database.push({
                    accountName: accountname,
                    profileName: profilename,
                    projectName: projectname,
                    projectDescription: projectdescription,
                    projectTimeCreated: projecttimecreated.toISOString().slice(0, 10),
                    taskName: taskname,
                    taskDescription: taskdescription,
                    taskStatus: taskstatus,
                    taskTimeCreated: tasktimecreated.toISOString().slice(0, 10),
                    taskTimeDeadline: tasktimedeadline,
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