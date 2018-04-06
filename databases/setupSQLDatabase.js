/**
 * Purpose: Creates database as specified in DatbaseOptions.js
 *
 */
var conn = require('./connection');
var DATABASE_OPTIONS = require('./DatabaseOptions.js');

conn.connect(function(err) {
  if (err) throw err;

  console.log("Connected!");
  console.log(DATABASE_OPTIONS.createDatabaseQuery());
  console.log(DATABASE_OPTIONS.useDatabaseQuery());
  console.log(DATABASE_OPTIONS.createUsersTableQuery());
  console.log(DATABASE_OPTIONS.createConfigTableQuery());

  conn.query(DATABASE_OPTIONS.initQuery(), function (err, result) {
    if (err) throw err;
    console.log("Init query ran successfully");
  });

  conn.query(DATABASE_OPTIONS.createDatabaseQuery(), function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

  conn.query(DATABASE_OPTIONS.useDatabaseQuery(), function (err, result) {
    if (err) throw err;
    console.log("Using create database");
  });

  conn.query(DATABASE_OPTIONS.createUsersTableQuery(), function (err, result) {
    if (err) throw err;
    console.log("Users Table Created");
  });

  conn.query(DATABASE_OPTIONS.createConfigTableQuery(), function (err, result) {
    if (err) throw err;
    console.log("Config Table Created");
  });

});