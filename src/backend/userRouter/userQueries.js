const pool = require('../database');

const getUserDatabase = (req, res, next) => {
    const username = req.params.user;
    pool.query(`SELECT * FROM user_project_task WHERE user_account = '${username}';`, (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows);
    });
}

module.exports = {
    getUserDatabase
}