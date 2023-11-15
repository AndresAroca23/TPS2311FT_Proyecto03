const mysql2 = require('mysql2');

const  database = mysql2.createPool({
    host: 'bq6l1gq9lw8ifbajboj4-mysql.services.clever-cloud.com',
    user: 'u16zvrkxtdcupipv',
    password: 'Z0WaqEfnpGuhJP3xWzMR',
    database: 'bq6l1gq9lw8ifbajboj4'
}).promise();

module.exports = database;