const { Router } = require('express');

const {
    getAll  
} = require('../controllers/rol.controller');

const router = Router();

router.get('/', getAll);

module.exports = router;