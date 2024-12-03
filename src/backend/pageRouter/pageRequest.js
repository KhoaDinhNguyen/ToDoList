const express = require('express');
const query = require('./pageQueries');
const pool = require('../database');
const process = require('process')
const pageRouter = express.Router();

require('dotenv').config();

pageRouter.get('/', (req, res) => {
    pool.query(`SELECT * FROM users;`, (err, result) => {
        if (err) {
            res.status(400).send(err.message);
        }
        else {
            res.status(200).json(result.rows);
        }
    })
})
pageRouter.post('/login', query.getAccountName, query.validateAccountName);
pageRouter.post('/signUp', query.createAccount);
pageRouter.post('/findAccount', query.findAccountNameExist);

module.exports = pageRouter;