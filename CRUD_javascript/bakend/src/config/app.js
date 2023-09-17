const express = require('express');

const oasisRoutes = require('../routes/oasis.routes')

const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//endpoints
app.use('/oasis', oasisRoutes);

module.exports = app;