const express = require('express');
const cors = require('cors');

const  productsRouter = require('../routes/productos.routes');
const  pedidoRouter = require('../routes/pedido.routes');
const  userRouter = require('../routes/usuario.routes');
const  rolRouter = require('../routes/rol.routes');
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
//endpoints
app.use('/products', productsRouter);
app.use('/pedido', pedidoRouter);
app.use('/user', userRouter);
app.use('/rol', rolRouter);

module.exports = app; 