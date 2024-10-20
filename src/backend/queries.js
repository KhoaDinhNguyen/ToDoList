const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ToDoList',
    password: 'bocttt',
    port: 5432
})

const getUsers = (req, res, next) => {
    res.status(200).send("START");
}

const getUserName = (req, res, next) => {
    pool.query(`SELECT password FROM users WHERE name = '${req.body.username}'`, (error, result) => {
        if (error) {
            res.status(400).json({message: 'Database problem'});
            throw error;
        }
        else if (result.rows.length === 0) {
            res.status(400).json({message: 'Not found', error: 'The passord or username is incorrect'});
        }
        else {
            res.password = result.rows[0].password;
            next();
        }
    });
}

const validateUserName = (req, res, next) => {
    const password = req.body.password;
    if (password === res.password) {
        pool.query(`SELECT * FROM users WHERE name = '${req.body.username}'`, (_, result) => {
            req.session.authenticated = true;
            req.session.user = {
                ...result.rows[0]
            };

            res.status(200).json({ ...result.rows[0], message: 'Found'});
        });
    }
    else {
        res.status(400).json({message: 'Not found', error: 'The passord or username is incorrect'});
    }
}

const getDatabase = (req, res, next) => {
    const userName = req.params.user;
    if (!req.session.authenticated || req.session.user.name !== userName) {
        res.status(400).json({error: 'BAD CREDENTIALS'});
    }
    else {
        pool.query(`SELECT * FROM user_project_task WHERE user_account = '${userName}';`, (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json(result.rows);
        });
    }
}
module.exports = {
    getUsers,
    getUserName,
    validateUserName,
    getDatabase
}