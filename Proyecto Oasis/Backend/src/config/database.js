const myql2 = require('mysql2');

const  database = myql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'thoor',
    database: 'Oasis'
});

module.exports = database;