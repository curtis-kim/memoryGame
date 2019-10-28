let db = require('../util/database');

// Add a single individual to the database
function addPeople(data) {
    let sql = "Insert into people (name, about, imageURL) values ('" + data.name+ "','"+ data.about+ "','" + data.imageURL + "')";
    db.execute(sql);
}

// Gets all the individuals in the database
function getAllPeople() {
    return db.execute('Select * from people');
}

// Gets a specific individual from the database
function getPeople(id) {
    return db.execute("Select * from people where id = ?",  [id]);
}

function getPeopleName(name){
    return db.execute('SELECT * FROM people where name = ? LIMIT 1', [name]);
}

function deletePeople(id){
    return db.execute("Delete from people where id = ?",  [id])
}

module.exports = {
    add : addPeople,
    getall : getAllPeople,
    getpeople: getPeople,
    getPeopleName: getPeopleName,
    deletepeople: deletePeople
}