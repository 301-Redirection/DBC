/** 
 *  Purpose: to illustrate how to connect to the MySQL database
 *  
 */
var con = require('./connection');

con.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
});