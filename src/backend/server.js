const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pageRouter = require('./pageRouter/pageRequest');
const taskRouter = require('./taskRouter/taskRequest');
const projectRouter = require('./projectRouter/projectRequest');
const userRouter = require('./userRouter/userRequest');

require('dotenv').config();

const app = express();

const port = process.env.BACKEND_PORT || 4041;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/task', taskRouter);
app.use('/project', projectRouter);
app.use('/user', userRouter);
app.use('/', pageRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});