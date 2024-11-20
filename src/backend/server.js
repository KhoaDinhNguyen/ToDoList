const express = require('express');
const process = require('process');
const cors = require('cors');
const bodyParser = require('body-parser');

const pageRouter = require('./pageRouter/pageRequest');
const taskRouter = require('./taskRouter/taskRequest');
const projectRouter = require('./projectRouter/projectRequest');
const userRouter = require('./userRouter/userRequest');

const app = express();
const port = process.env.BACKEND_PORT || 4040;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/task', taskRouter);
app.use('/project', projectRouter);
app.use('/user', userRouter);
app.use('/', pageRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});