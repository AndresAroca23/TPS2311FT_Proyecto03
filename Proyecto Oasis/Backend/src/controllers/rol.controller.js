const database = require('../config/database');

const getAll = async (req, res) => {
    const query = `SELECT * FROM rol `;
    const [result] = await database.query(query);
    if (result.length > 0) {
        res.json({ data: result, status: "Success" });
    } else {
        res.json({ message: 'No se encontro informacion', status: "Error" });
    }
};

module.exports = {
    getAll
}