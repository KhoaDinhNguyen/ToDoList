const dotenv = require('dotenv');
const Pool = require('pg').Pool;

dotenv.config();

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
            console.log(req.sessionID);
            console.log(req.session);
            res.status(200).json({ ...result.rows[0], message: 'Found'});
        });
    }
    else {
        console.log("HAHA");
        res.status(400).json({message: 'Not found', error: 'The passord or username is incorrect'});
    }
}

const getDatabase = (req, res, next) => {
    const username = req.params.user;
    console.log(req.sessionID);
    console.log(req.session);
    if (!req.session.authenticated || req.session.user.name !== username) {
        res.status(400).json({error: 'BAD CREDENTIALS'});
    }
    else {
        pool.query(`SELECT * FROM user_project_task WHERE user_account = '${username}';`, (err, result) => {
            if (err) {
                throw err;
            }
            console.log(result.rows);
            res.status(200).json(result.rows);
        });
    }
}

const createUser = (req, res, next) => {
    const password = req.body.password;
    const fullname = req.body.fullname;
    const username = req.body.username;
    pool.query(`CALL create_user('${username}', '${fullname}', '${password}')`, (err, result) => {
        if (err) {
            res.status(400).json({message: err.message, error: 'Have error'});
        }
        else {
            res.status(200).json({message: 'User signs up sucessfully'});
        }
    })
}
module.exports = {
    getUsers,
    getUserName,
    validateUserName,
    getDatabase,
    createUser
}