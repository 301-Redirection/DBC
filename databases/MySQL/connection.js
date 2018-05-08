/**
 * Purpose: exports a SQL connection
 *
 */
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
});

module.exports = conn;
