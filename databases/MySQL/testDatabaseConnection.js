/**
 *  Purpose: to illustrate how to connect to the MySQL database
 *
 */
const con = require('./connection');

con.connect((err) => {
    if (err) throw err;
});
