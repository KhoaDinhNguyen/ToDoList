const express = require('express');
const query = require('./taskQueries');

const taskRouter = express.Router();

taskRouter.put('/update/:user/:type', query.updateTask);
taskRouter.post('/create/:user', query.createTask);
taskRouter.delete('/delete/:user', query.deleteTask);

module.exports = taskRouter;