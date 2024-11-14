const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const query = require('./queries');
const path = require('path');
const app = express();
const PORT = 8080;
const cookieParser = require('cookie-parser')
const store = new session.MemoryStore();


app.use(cors({
    origin: ["https://khoadinhnguyen.github.io", "http://localhost:3000", "https://192.168.12.238:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(express.static(path.join(__dirname, '..', '..', '/public')));

//app.set('trust proxy', 1);

app.use(
    session({
        secret: "bocttt dev",
        resave: false,
        saveUninitialized: false,
        cookie: { 
            maxAge: 60000 * 6, 
            secure: false,
        },
        store
    })
);


app.get('/', query.getUsers);


app.post('/login', query.getUserName, query.validateUserName);
app.post('/signup', query.createUser);
app.get('/user/:user', query.getDatabase);


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
