const { Pool } = require('pg');
require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
    const pool = new Pool({
        connectionString: process.env.DB_CONNECTION,
        ssl: {
            rejectUnauthorized: false
        }
    });
    module.exports = pool;
}
else {
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'ToDoList',
        password: 'bocttt',
        port: 5432
    });
    module.exports = pool;
}

