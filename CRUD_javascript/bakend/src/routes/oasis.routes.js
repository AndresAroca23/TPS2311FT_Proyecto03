const { Router } = require('express');

const router = Router();

router.get('/:name/:id', (req, res) => {
    const{ name ,id } = req.params

    res.send(`${name}: ${id}`);
});

router.post('/', (req, res)=>{
    const {email, password} = req.body;
    res.send(`${email}: ${password}`);
});

router.post('/', (req, res)=>{
    res.send('Peticion PUT');
});

router.post('/', (req, res)=>{
    res.send('Peticion DELETE');
});

module.exports = router;