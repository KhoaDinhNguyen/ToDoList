const express = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const store = new session.MemoryStore();
const query = require('./queries');

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));
app.use(
    session({
        secret: "bocttt",
        resave: false   ,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 5, secure: false}
    })
);


app.get('/', query.getUsers);
app.post('/login', query.getUserName, query.validateUserName);
app.post('/signup', query.createUser);
app.get('/user/:user', query.getDatabase);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
