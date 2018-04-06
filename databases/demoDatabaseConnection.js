var con = require('./connection');

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});