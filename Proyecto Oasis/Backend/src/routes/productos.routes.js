const { Router } = require('express');

const {
    getAll,
    update,
    deleteProduct,
    save
} = require('../controllers/productos.controller');

const router = Router();

router.post('/', save);
router.get('/', getAll);
router.put ('/', update);
router.delete ('/', deleteProduct); 

module.exports = router;
