const express = require('express');
const myql2 = require('mysql2');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// html

app.get('/:name/:id', (req, res) => {
    const{ name ,id } = req.params

    res.send(`${name}: ${id}`);
});

app.post('/', (req, res)=>{
    const {email, password} = req.body;
    res.send(`${email}: ${password}`);
});

app.post('/', (req, res)=>{
    res.send('Peticion PUT');
});

app.post('/', (req, res)=>{
    res.send('Peticion DELETE');
});


// === db ===

const connection = myql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'oasis',
 
 });

 connection.connect((err) => { 
    if(err) throw err;
    console.log ('BD conectada');
});

app.listen(3000, ()=>{
    console.log('Servidor encendido');
});