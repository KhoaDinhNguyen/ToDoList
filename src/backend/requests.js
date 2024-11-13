const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const query = require('./queries');
const path = require('path');
const https = require('https');
const fs = require('fs');
const cookieParser = require('cookie-parser')
const app = express();
const PORT = 8080;
const store = new session.MemoryStore();

console.log(path.join(__dirname, 'cert', 'key.pem'));

const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'))
}

const sslServer = https.createServer(httpsOptions, app);

app.use(cors({
    origin: ["http://localhost:3000", "https://khoadinhnguyen.github.io", "https://localhost:3000", "https://192.168.12.238:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', '..', '/public')));

app.set('trust proxy', 1);

app.use(
    session({
        secret: "bocttt play video games",
        resave: false,
        saveUninitialized: false,
        cookie: { 
            maxAge: 1000 * 60 * 5, 
            secure: true,
            sameSite: 'none'
        },
        store
    })
);


app.get('/', query.getUsers);
app.post('/login', query.getUserName, query.validateUserName);
app.post('/signup', query.createUser);
app.get('/user/:user', query.getDatabase);

sslServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
