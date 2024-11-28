const pool = require('../database');

const getAccountName = async (req, res, next) => {
    const { accountName } = req.body;
    pool.query(`SELECT password FROM users WHERE name = '${accountName}'`, (error, result) => {
        if (error) {
            res.status(400).json({message: 'Database problem', error: true});
            throw error;
        }
        else if (result.rows.length === 0) {
            res.status(400).json({message: 'The passord or account name is incorrect', error: true});
        }
        else {
            res.password = result.rows[0].password;
            next();
        }
    });
};

const validateAccountName = (req, res, next) => {
    const {password, accountName} = req.body;

    if (password === res.password) {
        pool.query(`SELECT * FROM users WHERE name = '${accountName}'`, (_, result) => {
            res.status(200).json({ ...result.rows[0], message: 'Found', error: false});
        });
    }
    else {
        res.status(400).json({message: 'The passord or account name is incorrect', error: true});
    }
};

const createAccount = (req, res, next) => {
    const { accountName, profileName, password} = req.body;

    pool.query(`CALL create_user('${accountName}', '${profileName}', '${password}')`, (err, result) => {
        if (err) {
            res.status(400).json({message: err.message, error: true});
        }
        else {
            res.status(200).json({message: 'Sign up successfully. Return to login to sign in', error: false});
        }
    })
};

module.exports = {
    getAccountName,
    validateAccountName,
    createAccount
}