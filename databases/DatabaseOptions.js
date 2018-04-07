/**
 * Database Options (Legacy -- before advent of Sequelize) 
 * 	
 * Input: This class requires intial parameters of 
 *			@param {String} databaseName 
 *			@param {String} usersTableName
 *			@param {Object} usersSchema -- will be described later in the documentation
 *			@param {String} configTableName
 *			@param {Object} configTableSchema -- will be described later in the documentation
 *			@param {String} configForeignKeyName -- the name of the field that will reference user table's id
 *			@param {Boolean} shouldDrop -- whether to try to drop database if exists
 *
 * Purpose: This class is used to generate the MySQL queries to create the database
 * 
 *
 */

class DatabaseOptions {

	constructor(databaseName, usersTableName, usersSchema, configTableName, configTableSchema, configForeignKeyName, shouldDrop) {
		this.databaseName = databaseName;
		this.usersTableName = usersTableName;
		this.usersSchema = usersSchema;
		this.configTableName = configTableName;
		this.configTableSchema = configTableSchema;
		this.configForeignKeyName = configForeignKeyName;
		this.shouldDrop = shouldDrop;
	}

	initQuery() {
		if (this.shouldDrop == true) {
			return "DROP DATABASE IF EXISTS " + this.databaseName + ";"
		}
		else {
			return "";
		}
	}

	createDatabaseQuery() {
		return "CREATE DATABASE " + this.databaseName + ";";
	}

	useDatabaseQuery() {
		return "USE " + this.databaseName + ";";
	}

	createUsersTableQuery() {
		let str = "CREATE TABLE " + this.usersTableName + "(";
		for(var key in this.usersSchema) {
	     	str += key + " " + this.usersSchema[key] + ", ";
		}
		str += "PRIMARY KEY(id));";
		return str;
	}

	createConfigTableQuery() {
		let str = "CREATE TABLE " + this.configTableName + "(";
		for(var key in this.configTableSchema) {
	     	str += key + " " + this.configTableSchema[key] + ", ";
		}
		str += "PRIMARY KEY(id), FOREIGN KEY ("
		+ this.configForeignKeyName +") REFERENCES " + this.usersTableName + "(id)";
		str += ");";
		return str;
	}

};

/** Example User Schema
 * 
 *	The key is the name of the field 
 *  The value of the key is the MySQL Data type
 *	Assumption: This object will always have an id key
 * 
 */
let userSchema = {
	id: "INT NOT NULL AUTO_INCREMENT",
	first_name: "VARCHAR(255)",
	last_name: "VARCHAR(255)",
	auth0_id: "VARCHAR(255)",
}

/** Example Config Schema
 * 
 *	The key is the name of the field 
 *  The value of the key is the MySQL Data type
 *	Assumption: This object will always have an id key
 *				That this will have a foreign key
 * 
 */
let configSchema = {
	id: "INT NOT NULL AUTO_INCREMENT",
	configuration: "MEDIUMTEXT",
	user_id: "INT NOT NULL",
	auth0_id: "VARCHAR(255)",
}

let dbName = "test";
let usersTableName = "users";
let configTableName = "bot_config_data";
let configForeignKeyName = "user_id";
let shouldDrop = false;

const DATABASE_OPTIONS = new DatabaseOptions(dbName, usersTableName, userSchema, configTableName, configSchema, configForeignKeyName, shouldDrop);

module.exports = DATABASE_OPTIONS;
