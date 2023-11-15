const database = require('../config/database');

const login = async (req, res) => {

    const { password, nickname } = req.body;
    const query = `SELECT * FROM usuario WHERE password= ? and (nickname = ? or email = ?);`;

    const  [result]  = await database.query(query, [password, nickname, nickname]);
    if (result[0] !== undefined) {
        res.json({ data: result[0], status: "Success" });
    } else {
        res.json({ message: 'Las credenciales no coinciden', status: "Error" });
    }
};

const getAll = async (req, res) => {
    const result = await database.query("SELECT * FROM usuario");
    res.json({ data: result[0], status: "Success" });
};

const update = async (req, res) => {
    const { id, login, email, telefono, idRol } = req.body;
    const query = `UPDATE usuario SET login = ?, email = ?, telefono = ?, idRol = ? Where id = ?;`;

    const [result] = await database.query(query, [login, email, telefono, idRol, id]);
    if (result.affectedRows > 0) {
        res.json({ result, status: "Success" });
    } else {
        res.json({ message: 'No se logro actualizar el registro', status: "Error" });
    }
};

const save = async (req, res) => {
    const { login, password, nickname, email, telefono, idRol } = req.body;
    const query = `INSERT INTO usuario(login, password, nickname, email, telefono, idRol) VALUES(?,?,?,?,?,?)`;

    const [result] = await database.query(query, [login, password, nickname, email, telefono, idRol])
    if (result.affectedRows > 0) {
        res.send({ message: 'usuario creado', status: "Success" });
    }
    else {
        res.send({ message: 'No se logro crear el usuario', status: "Error" });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.body;
    const query = `Delete from usuario Where id = ?;`;
    const [result] = await database.query(query, [id]);
    
    if (result !== undefined) {
        res.json({ result, status: "Success" });
    } else {
        res.json({ message: 'No se logro eliminar el registro', status: "Error" });
    }

};

module.exports = {
    login,
    getAll,
    update,
    deleteUser,
    save
}