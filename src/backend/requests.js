const express = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors');
const bodyParser = require('body-parser');

const query = require('./queries');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));

app.get('/', query.getUsers);
app.post('/login', query.getUserName, query.validateUserName);
app.get('/:user', query.getProjects);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
