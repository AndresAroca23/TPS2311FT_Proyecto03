const express = require('express');
const cors = require('cors');
const hbs = require('express-handlebars');
const ejs = require('ejs');

const path = require('path');


const  productsRouter = require('../routes/productos.routes');
const  pedidoRouter = require('../routes/pedido.routes');
const  userRouter = require('../routes/usuario.routes');
const  rolRouter = require('../routes/rol.routes');
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(path.join(__dirname, '../../../Frontend/')));
app.use(express.static(path.join(__dirname, '../../../Frontend/views')));
app.set('views', path.join(__dirname, '../../../Frontend/views/'));
app.set('view engine', 'ejs');

// renderizacion
app.get("/", (req, res)=>{
    res.render("index");
});

app.get("/productsRender", (req, res)=>{
    console.log("/productsRender");
    res.render("productos");
});
app.get("/home", (req, res)=>{
    res.render("home");
});
app.get("/local", (req, res)=>{
    res.render("locales");
});
app.get("/historia", (req, res)=>{
    res.render("historia");
});


//endpoints
app.use('/products', productsRouter);
app.use('/pedido', pedidoRouter);
app.use('/user', userRouter);
app.use('/rol', rolRouter);

module.exports = app; 