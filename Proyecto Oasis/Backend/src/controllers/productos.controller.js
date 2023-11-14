const database = require('../config/database');
const mysql2 = require('mysql2');
const fs = require('fs');

const imageToBase64 = async function (file) {
    if (file) {
        // read binary data
        var bitmap = fs.readFileSync(file, "base64");
        return bitmap;
    }
}

const getAll = (req, res) => {
    const readQuery = `SELECT * FROM productos `;

    const query = mysql2.format(readQuery);

    database.query(query, async (err, result) => {
        if (err) throw err;
        if (result !== undefined) {
            let listData = [];
            for (let index = 0; index < result.length; index++) {
                let data = {};
                data.id = result[index].id;
                data.names_id = result[index].names_id;
                data.precio_id = result[index].precio_id;
                data.DESCRIPTION = result[index].DESCRIPTION;
                data.imagen = result[index].imagen;
                data.Descuentos = result[index].Descuentos;
                data.base64 = await imageToBase64(data.imagen);
                listData.push(data);
            }
            res.json({data:listData});
        } else {
            res.json({ message: 'Usuario no encontrado' });
        }
    });
};

const update = (req, res) => {
    const { id, names_id, precio_id, imagen, DESCRIPTION, Descuentos } = req.body;
    let newImage = "";
    console.log(req.body);
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
    const readQuery = `UPDATE productos SET names_id = ?, precio_id = ?, DESCRIPTION = ?, Descuentos = ?, imagen = ? Where id = ?;`;

    const query = mysql2.format(readQuery, [names_id, precio_id, DESCRIPTION, Descuentos, newImage, id]);

    database.query(query, (err, result) => {
        if (err) throw err;
        if (result !== undefined) {
            res.json({ result, status: "Success" });
        } else {
            res.json({ message: 'No se logro actualizar el registro', status: "Error" });
        }
    });
};

const deleteProduct = (req, res) => {
    const { id } = req.body;
    const readQuery = `Delete from productos Where id = ?;`;

    const query = mysql2.format(readQuery, [id]);

    database.query(query, (err, result) => {
        if (err) throw err;
        if (result !== undefined) {
            res.json({ result, status: "Success" });
        } else {
            res.json({ message: 'No se logro eliminar el registro', status: "Error" });
        }
    });
};

const save = (req, res) => {

    const { names_id, precio_id, DESCRIPTION, Descuentos, imagen } = req.body;

    const createQuery = `INSERT INTO productos(names_id, precio_id, DESCRIPTION, Descuentos, imagen) VALUES(?,?,?,?,?)`;

    const query = mysql2.format(createQuery, [names_id, precio_id, DESCRIPTION, Descuentos, imagen]);

    database.query(query, (err, result) => {
        if (err) throw err;
        res.send({ message: 'producto creado', status: "Success" });
    });
};

module.exports = {
    getAll,
    update,
    deleteProduct,
    save
}