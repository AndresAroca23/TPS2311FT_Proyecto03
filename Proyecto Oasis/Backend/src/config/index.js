const app = require('./app');
const database = require("../config/database");

const main = async() => {
app.listen(3000, ()=>{
    console.log('Servidor escuchando puerto 3000'); 
});
};

main(); 