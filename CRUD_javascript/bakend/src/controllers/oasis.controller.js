// CRUD

const readOasis = (req, res) => {
    const{ name ,id } = req.params;

    console.log('Desde el controlador');

    res.send(`${name}: ${id}`);
};

const createOasis = (req, res) => {const {email, password} = req.body;
res.send(`${email}: ${password}`);
};

const updateOasis = (req, res) =>{res.send('Peticion PUT');
};

const deleteOasis = (req, res) => { res.send('Peticion DELETE');
};

module.exports = {
    createOasis,
    readOasis,
    updateOasis,
    deleteOasis,

};