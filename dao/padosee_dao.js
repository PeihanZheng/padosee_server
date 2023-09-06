// import modules
const { createPool } = require("mysql");
const dotenv = require('dotenv');
const fs = require('fs');

// configure dotenv
dotenv.config();

// create connection
const pool = createPool({
    host: process.env.MYSQL_HOSTNAME,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT,
    connectionLimit: 1000,
    ssl: false
});

// connect to database
pool.getConnection((error, connection) => {
    if (error) {
        console.error(error);
        // check for connection errors
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        } else if (error.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        } else if (error.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }else{
            console.error(error);
        }
    } else {
        console.log("Connected to MySQL database...");
    }

    // release connection
    if (connection) connection.release();

    // return statement
    return;
});

// export connection
module.exports = pool;
