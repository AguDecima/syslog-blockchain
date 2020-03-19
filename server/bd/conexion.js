const mysql = require('mysql');

const connectionString = {
    "host": "localhost",
    "port": 3306,
    "database": "syslog",
    "user": "root",
    "password": "root1234"
};

var db = mysql.createPool(connectionString);


module.exports = db;