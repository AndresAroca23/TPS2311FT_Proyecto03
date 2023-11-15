const database = require('../config/database');

const save = async (req,res) => {
 
    let today = new Date(); 
    const { name, direccion, telefono, cantidad, products_id, total_compra} = req.body; 
    const query = `INSERT INTO compras_id(name, direccion, telefono, cantidad, products_id, fecha_compra, total_compra) VALUES(?,?,?,?,?,?,?)`;

    const [result] = await database.query(query, [name, direccion, telefono, cantidad, products_id, today, total_compra]);
    if(result.affectedRows> 0){
        res.send({ message: 'pedido creado'});
    }else{
        res.send({ message: 'No se logró realizar la compra'});
    }    
};

module.exports= {
    save 
}