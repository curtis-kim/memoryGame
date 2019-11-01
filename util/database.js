const mysql = require('mysql2');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'user',
    password: 'rootroot'
});
console.log("created data connection");

module.exports = pool.promise();