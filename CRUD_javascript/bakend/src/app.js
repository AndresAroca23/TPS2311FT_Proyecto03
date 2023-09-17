
 
 connection.connect((err) => { 
     if(err) throw err;
     console.log ('BD conectada');
 });
 
 const querySql = 'SHOW TABLES;';
 
 connection.query(querySql, (err, res) =>{
     if (err) throw err;
     console.log('respuesta sql', res );
 });
 
 
 const insertQuery = `INSERT INTO compras_id(name, direccion, telefono, cantidad) VALUES('Santiago','Cra 123 c bis #45 a 21','318775407',4);`;
 
 
 connection.query(insertQuery, (err, res)=> {
     if (err) throw err;
     console.log('respuesta insert', res)
 })
 
 const getQuery = `SELECT * FROM compras_id;`;
 
 connection.query(getQuery, (err, res)=> {
     if (err) throw err;
     console.log('respuesta insert', res)
 })
 
 
 app.listen(3000, () => {
     console.log('servidor encendido');
 });
 