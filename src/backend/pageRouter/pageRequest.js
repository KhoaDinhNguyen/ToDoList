const express = require('express');
const query = require('./pageQueries');

const pageRouter = express.Router();

pageRouter.post('/login', query.getAccountName, query.validateAccountName);
pageRouter.post('/signUp', query.createAccount);

module.exports = pageRouter;