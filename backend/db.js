// Get the client
const mysql = require('mysql2');
require('dotenv').config()

// Create the connection to database
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 10
  });

module.exports = pool;