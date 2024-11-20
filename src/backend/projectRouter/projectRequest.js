const express = require('express');
const query = require('./projectQueries');

const projectRouter = express.Router();

projectRouter.post('/create/:user', query.createProject);

module.exports = projectRouter;