const mysql = require('mysql2');


const pool = mysql.createPool({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'bbfa1e6dc874be',
    database: 'heroku_8e2650085bf435c',
    password: '89e14339'
});
console.log("created data connection");

module.exports = pool.promise();