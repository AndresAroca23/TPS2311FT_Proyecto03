const database = require('../config/database');
const fs = require('fs');

const imageToBase64 = async function (file) {
    if (file) {
        // read binary data
        var bitmap = fs.readFileSync(file, "base64");
        return bitmap;
    }
}

const getAll = async (req, res) => {
    const query = `SELECT * FROM productos `;

    const result =  await database.query(query);
    if (result[0] != undefined) {
        let listData = [];
        for (let index = 0; index < result[0].length; index++) {
            let data = {};
            data.id = result[0][index].id;
            data.names_id = result[0][index].names_id;
            data.precio_id = result[0][index].precio_id;
            data.DESCRIPTION = result[0][index].DESCRIPTION;
            data.imagen = result[0][index].imagen;
            data.Descuentos = result[0][index].Descuentos;
            data.base64 = await imageToBase64(data.imagen);
            listData.push(data);
        }
        res.json({data:listData});   
    }
};

const update = async (req, res) => {
    const { id, names_id, precio_id, imagen, DESCRIPTION, Descuentos } = req.body;
    let newImage = "";
    if (req.file) {
        if (imagen) {
            fs.unlink(imagen, () => {
                console.log("Eliminado");
            }, (err) => {
                console.log("No se encontro la imagen", imagen);
            });
        }
        newImage = `./${req.file.path.replace(/\\/g, "/")}`;
    } else {
        newImage = imagen;
    }
    Descuentos == "" ? 0 : parseInt(Descuentos);
    const query = `UPDATE productos SET names_id = ?, precio_id = ?, DESCRIPTION = ?, Descuentos = ?, imagen = ? Where id = ?;`;

    const [result] = await database.query(query,[names_id, precio_id, DESCRIPTION, Descuentos, newImage, id]);
        if (result.affectedRows > 0) {
            res.json({ result, status: "Success" });
        } else {
            res.json({ message: 'No se logro actualizar el registro', status: "Error" });
        }
};

const deleteProduct = async(req, res) => {
    const { id } = req.body;
    const query = `Delete from productos Where id = ?;`;

    const [result] = await database.query(query, [id]);
        if (result !== undefined) {
            res.json({ result, status: "Success" });
        } else {
            res.json({ message: 'No se logro eliminar el registro', status: "Error" });
        }
};

const save = async(req, res) => {

    const { names_id, precio_id, DESCRIPTION, Descuentos, imagen } = req.body;

    let newImage = "";
    if (req.file) {
        if (imagen) {
            fs.unlink(imagen, () => {
                console.log("Eliminado");
            }, (err) => {
                console.log("No se encontro la imagen", imagen);
            });
        }
        newImage = `./${req.file.path.replace(/\\/g, "/")}`;
    } else {
        newImage = imagen;
    }
    const query = `INSERT INTO productos(names_id, precio_id, DESCRIPTION, Descuentos, imagen) VALUES(?,?,?,?,?)`;
    const [result] = await database.query(query,[names_id, precio_id, DESCRIPTION, Descuentos, newImage]);
    if (result.affectedRows > 0) {
        res.json({ result, message:'producto creado',  status: "Success" });
    } else {
        res.json({ message: 'No se logro crear el producto', status: "Error" });
    }
};

module.exports = {
    getAll,
    update,
    deleteProduct,
    save
}