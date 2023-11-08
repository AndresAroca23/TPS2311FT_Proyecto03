const database = require('../config/database');
const mysql2 = require('mysql2');

const getAll = (req,res) => {
    const readQuery= `SELECT * FROM productos `;

    const query = mysql2.format (readQuery );

    database.query(query, (err, result)=>{
        if (err) throw err;
        if (result !== undefined){
            res.json(result);   
        }else{
            res.json({ message: 'Usuario no encontrado'}); 
        }
    });
};

const update = (req,res) => {
    const {id, names_id, precio_id, DESCRIPTION, Descuentos} = req.body;
    Descuentos == "" ? 0 : parseInt(Descuentos);
    const readQuery= `UPDATE productos SET names_id = ?, precio_id = ?, DESCRIPTION = ?, Descuentos = ? Where id = ?;`;

    const query = mysql2.format (readQuery, [names_id, precio_id, DESCRIPTION, Descuentos,id] );

    database.query(query, (err, result)=>{
        console.log(result);
        if (err) throw err;
        if (result !== undefined){
            res.json({result, status: "Success"});   
        }else{
            res.json({ message: 'No se logro actualizar el registro', status: "Error"}); 
        }
    });
};

const deleteProduct = (req,res) => {
    const {id} = req.body;
    const readQuery= `Delete from productos Where id = ?;`;

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

const save = (req,res) => {

    const {names_id, precio_id, DESCRIPTION, Descuentos, imagen} = req.body; 
    
    const createQuery = `INSERT INTO productos(names_id, precio_id, DESCRIPTION, Descuentos, imagen) VALUES(?,?,?,?,?)`;

    const query = mysql2.format(createQuery, [names_id, precio_id, DESCRIPTION, Descuentos, imagen]);

    database.query(query, (err, result)=>{
        if (err) throw err;
        res.send({ message: 'producto creado', status: "Success"});
    });
};

module.exports= {
    getAll ,
    update,
    deleteProduct,
    save
}