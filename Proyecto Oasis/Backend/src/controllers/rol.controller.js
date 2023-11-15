const database = require('../config/database');

const getAll = async (req, res) => {
    const query = `SELECT * FROM rol `;
    const [result] = await database.query(query);
    if (result[0] !== undefined) {
        res.json({ data: result[0], status: "Success" });
    } else {
        res.json({ message: 'No se encontro informacion', status: "Error" });
    }
};

module.exports = {
    getAll
}