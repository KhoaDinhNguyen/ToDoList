const express = require('express');
const query = require('./projectQueries');

const projectRouter = express.Router();

projectRouter.post('/create/:user', query.createProject);
projectRouter.delete('/delete/:user', query.deleteProject);
projectRouter.put('/update/:user', query.updateProject);

module.exports = projectRouter;