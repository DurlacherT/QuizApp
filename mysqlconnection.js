/**
 * mysqlconnection.js provides the connection to our user database
 * con is exported to users.js
 */

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "thomas",
  password: "qw56km246",
  database : "nodelogin"
});

module.exports = con;
