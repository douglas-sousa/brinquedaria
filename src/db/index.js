const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  port: '3306',
  database: 'brinquedaria'
})

module.exports = mysqlConnection;