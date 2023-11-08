const database = require('../config/database');
const mysql2 = require('mysql2');

const getAll = (req,res) => {
    const readQuery= `SELECT * FROM rol `;

    const query = mysql2.format (readQuery );

    database.query(query, (err, result)=>{
        if (err) throw err;
        if (result !== undefined){
            res.json( {data :result, status: "Success"});   
        }else{
            res.json({ message: 'No se encontro informacion', status : "Error"}); 
        }
    });
};

module.exports = {
    getAll
}