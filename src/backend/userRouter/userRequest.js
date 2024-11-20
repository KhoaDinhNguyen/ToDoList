const express = require('express');
const query = require('./userQueries');

const userRouter = express.Router();

userRouter.get('/:user', query.getUserDatabase);

module.exports = userRouter;