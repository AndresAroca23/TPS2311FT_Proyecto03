const { Router } = require('express');

const {
    save  
} = require('../controllers/pedido.controller');

const router = Router();
router.post('/', save);


module.exports = router;