const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ToDoList',
    password: 'bocttt',
    port: 5432
})

const getUsers = (req, res, next) => {
    pool.query("SELECT * FROM users", (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(result.rows);
    })
}

const getUserName = (req, res, next) => {
    pool.query(`SELECT password FROM users WHERE name = '${req.body.username}'`, (error, result) => {
        if (error) {
            throw error;
        }
        res.password = result.rows[0].password;
        next();
    });
}

const validateUserName = (req, res, next) => {
    const password = req.body.password;
    if (password === res.password) {
        pool.query(`SELECT * FROM users WHERE name = '${req.body.username}'`, (_, result) => {
            res.status(200).json({ ...result.rows[0], message: 'Found'});
        });
    }
    else {
        res.status(404).json({message: 'Not found', error: 'The passord or username is incorrect'});
    }
}

const getProjects = (req, res, next) => {
    const userName = req.params.user;
    pool.query(`SELECT * FROM users u JOIN projects p ON u.name = p.user_name WHERE u.name = '${userName}';`, (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows);
    });
}
module.exports = {
    getUsers,
    getUserName,
    validateUserName,
    getProjects
}