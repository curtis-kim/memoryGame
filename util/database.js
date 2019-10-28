const mysql = require('mysql2');

// connect to a database peoplebook running on your localmachine
const pool = mysql.createPool({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'ba5bfba78ec352',
    database: 'heroku_87f38226a4b6b21',
    password: '66744487'
});
console.log("created connection");

module.exports = pool.promise();