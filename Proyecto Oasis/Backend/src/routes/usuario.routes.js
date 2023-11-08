const { Router } = require('express');

const {
    login,
    getAll,
    update ,
    deleteUser,
    save
} = require('../controllers/usuario.controller');

const router = Router();
router.post('/login', login);
router.post('/', save);
router.put('/', update);
router.delete('/', deleteUser);
router.get('/', getAll);


module.exports = router;