// db.js
const mysql = require('mysql');
require('dotenv').config(); // Load environment variables

// Debug: Check environment variables
console.log('DB Host:', process.env.DB_HOST);  // Check DB_HOST
console.log('DB Port:', process.env.DB_PORT);  // Check DB_PORT

const connection = mysql.createConnection({
    host: process.env.DB_HOST, // Use environment variable for host
    user: process.env.DB_USER, // Use environment variable for user
    password: process.env.DB_PASSWORD, // Use environment variable for password
    database: process.env.DB_NAME, // Use environment variable for database name
    port: process.env.DB_PORT // Use environment variable for port
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

module.exports = connection;
