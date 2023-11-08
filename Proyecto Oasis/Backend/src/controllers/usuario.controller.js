const database = require('../config/database');
const mysql2 = require('mysql2');

const login = (req, res) => {

    const { password, nickname } = req.body;
    const readQuery= `SELECT * FROM usuario WHERE password= ? and (nickname = ? or email = ?);`;

    const query = mysql2.format(readQuery, [password, nickname,nickname]);

    database.query(query, (err, result)=>{
        if (err) throw err;
        if (result[0] !== undefined){
            res.json({ data: result[0], status: "Success"});   
        }else{
            res.json({ message: 'Las credenciales no coinciden', status: "Error"}); 
        }
    });
};

const getAll = (req, res) => {

    const { password, nickname } = req.body;
    const readQuery= `SELECT * FROM usuario;`;

    const query = mysql2.format(readQuery, [password, nickname,nickname]);

    database.query(query, (err, result)=>{
        if (err) throw err;
        if (result !== undefined){
            res.json({ data: result, status: "Success"});   
        }else{
            res.json({ message: 'Error al consultar la información', status: "Error"}); 
        }
    });
};

const update = (req,res) => {
    const {id, login, email, telefono, idRol} = req.body;
    const readQuery= `UPDATE usuario SET login = ?, email = ?, telefono = ?, idRol = ? Where id = ?;`;

    const query = mysql2.format (readQuery, [login, email, telefono, idRol,id] );

    database.query(query, (err, result)=>{
        if (err) throw err;
        if (result !== undefined){
            res.json({result, status: "Success"});   
        }else{
            res.json({ message: 'No se logro actualizar el registro', status: "Error"}); 
        }
    });
};

const save = (req,res) => {
    const { login, password, nickname, email, telefono, idRol} = req.body; 
    
    const createQuery = `INSERT INTO Usuario(login, password, nickname, email, telefono, idRol) VALUES(?,?,?,?,?,?)`;

    const query = mysql2.format(createQuery, [login, password, nickname, email, telefono, idRol]);

    database.query(query, (err, result)=>{
        if (err) throw err;
        res.send({ message: 'usuario creado', status: "Success"});
    });
};

const deleteUser = (req,res) => {
    const {id} = req.body;
    const readQuery= `Delete from usuario Where id = ?;`;

    const query = mysql2.format (readQuery, [id] );

    database.query(query, (err, result)=>{
        if (err) throw err;
        if (result !== undefined){
            res.json({result, status: "Success"});   
        }else{
            res.json({ message: 'No se logro eliminar el registro', status: "Error"}); 
        }
    });
};

module.exports= {
    login ,
    getAll,
    update,
    deleteUser,
    save
}