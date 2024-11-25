const dotenv = require('dotenv');
const Pool = require('pg').Pool;

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DB_CONNECTION,
    ssl: {
        rejectUnauthorized: false
    }
});

/*
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ToDoList',
    password: 'bocttt',
    port: 5432
})
*/

module.exports = pool;