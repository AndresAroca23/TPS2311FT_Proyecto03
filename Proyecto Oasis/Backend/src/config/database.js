const myql2 = require('mysql2');

const  database = myql2.createConnection({
    host: 'bq6l1gq9lw8ifbajboj4-mysql.services.clever-cloud.com',
    user: 'u16zvrkxtdcupipv',
    password: 'Z0WaqEfnpGuhJP3xWzMR',
    database: 'bq6l1gq9lw8ifbajboj4'
});

module.exports = database;