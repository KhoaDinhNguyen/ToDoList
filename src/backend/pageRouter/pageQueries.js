const pool = require('../database');
const bcrypt = require('bcrypt');

const getAccountName = (req, res, next) => {
    const { accountName } = req.body;
    pool.query(`SELECT password FROM users WHERE name = '${accountName}'`, (error, result) => {
        if (error) {
            res.status(400).json({message: 'Database problem', error: true});
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

const findAccountNameExist = (req, res, next) => {
    const { accountName } = req.body;
    pool.query(`SELECT * FROM users WHERE name = '${accountName}';`, (error, result) => {
        if (error) {
            res.status(400).json({message: 'Database problem', error: true});
        }
        else if (result.rows.length === 0) {
            res.status(400).json({message: 'Cannot find account name', error: true});
        }
        else {
            res.status(200).json({message: 'Account name exists', error: false});
        }
    });
}

const validateAccountName = async (req, res, next) => {
    const {password, accountName} = req.body;
    try {
        const match = await bcrypt.compare(password, res.password);
        if (match) {
            pool.query(`SELECT * FROM users WHERE name = '${accountName}'`, (_, result) => {
                res.status(200).json({ ...result.rows[0], message: 'Found', error: false});
            });
        }
        else {
            res.status(400).json({message: 'The passord or account name is incorrect', error: true});
        }
    }
    catch(err) {
        console.log(err);
    }
    

};

const createAccount = async (req, res, next) => {
    const { accountName, profileName, password} = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        pool.query(`CALL create_user('${accountName}', '${profileName}', '${hashedPassword}')`, (err, result) => {
            if (err) {
                res.status(400).json({message: err.message, error: true});
            }
            else {
                res.status(200).json({message: 'Sign up successfully. Return to login to sign in', error: false});
            }
        });
    }
    catch(err) {
        console.log(err);
    }
};

module.exports = {
    getAccountName,
    validateAccountName,
    createAccount,
    findAccountNameExist
}