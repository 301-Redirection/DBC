/**
 * Purpose: exports a SQL connection
 *
 */
var mysql = require('mysql');

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
});

module.exports = conn;