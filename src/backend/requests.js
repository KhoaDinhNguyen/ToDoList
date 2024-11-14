const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const query = require('./queries');
const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', query.getUsers);
app.post('/login', query.getUserName, query.validateUserName);
app.post('/signup', query.createUser);
app.get('/user/:user', query.getDatabase);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
