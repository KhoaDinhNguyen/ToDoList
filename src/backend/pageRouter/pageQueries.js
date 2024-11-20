const pool = require('../database');

const getAccountName = (req, res, next) => {
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
};

const validateAccountName = (req, res, next) => {
    const password = req.body.password;
    const accountName = req.body.username;

    if (password === res.password) {
        pool.query(`SELECT * FROM users WHERE name = '${accountName}'`, (_, result) => {
            res.status(200).json({ ...result.rows[0], message: 'Found'});
        });
    }
    else {
        res.status(400).json({message: 'Not found', error: 'The passord or username is incorrect'});
    }
};

const createAccount = (req, res, next) => {
    const password = req.body.password;
    const profileName = req.body.fullname;
    const accountName = req.body.username;
    pool.query(`CALL create_user('${accountName}', '${profileName}', '${password}')`, (err, result) => {
        if (err) {
            res.status(400).json({message: err.message, error: 'Have error'});
        }
        else {
            res.status(200).json({message: 'User signs up sucessfully'});
        }
    })
};

module.exports = {
    getAccountName,
    validateAccountName,
    createAccount
}