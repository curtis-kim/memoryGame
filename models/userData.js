let db = require('../util/database');

// Add a single individual to the database
function addUser(data) {
    let sql = "Insert into user (name, score) values ('" + data.name+ "','"+ data.score+ "')";
    db.execute(sql);
}

// Gets all the individuals in the database
function getAllUser() {
    return db.execute('Select * from user');
}
function getTop5User(){
    return db.execute('SELECT * FROM user ORDER BY score DESC LIMIT 5')
}

// Gets a specific individual from the database
function getUser(id) {
    return db.execute("Select * from user where id = ?",  [id]);
}

function getUserName(name){
    return db.execute('SELECT * FROM user where name = ? LIMIT 1', [name]);
}

function deleteUser(id){
    return db.execute("Delete from user where id = ?",  [id])
}

module.exports = {
    add : addUser,
    getall : getAllUser,
    getTop5 : getTop5User,
    getpeople: getUser,
    getPeopleName: getUserName,
    deletepeople: deleteUser
}