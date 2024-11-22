const express = require('express');
const query = require('./projectQueries');

const projectRouter = express.Router();

projectRouter.post('/create/:user', query.createProject);
projectRouter.delete('/delete/:user', query.deleteProject);

module.exports = projectRouter;