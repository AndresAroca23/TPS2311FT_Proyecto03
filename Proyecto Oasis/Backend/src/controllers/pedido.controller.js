const database = require('../config/database');
const mysql2 = require('mysql2');

const save = (req,res) => {
 
    let today = new Date(); 

    const { name, direccion, telefono, cantidad, products_id, total_compra} = req.body; 

    const createQuery = `INSERT INTO compras_id(name, direccion, telefono, cantidad, products_id, fecha_compra, total_compra) VALUES(?,?,?,?,?,?,?)`;

    const query = mysql2.format(createQuery, [name, direccion, telefono, cantidad, products_id, today, total_compra]);

    database.query(query, (err, result)=>{
        if (err) throw err;
        res.send({ message: 'pedido creado'});
    });
};

module.exports= {
    save 
}