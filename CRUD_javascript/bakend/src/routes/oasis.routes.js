const { Router } = require('express');

const { createOasis,
    readOasis,
    updateOasis,
    deleteOasis,
 } = require('../controllers/oasis.controller');

const router = Router();

router.get('/:name/:id', readOasis);

router.post('/', createOasis);

router.post('/', updateOasis);

router.post('/', deleteOasis);

module.exports = router;