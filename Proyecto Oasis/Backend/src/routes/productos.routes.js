const { Router } = require('express');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./Backend/src/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  });
  const upload = multer({storage:storage});


const {
    getAll,
    update,
    deleteProduct,
    save
} = require('../controllers/productos.controller');

const router = Router();

router.post('/', upload.single("file"), save);
router.get('/', getAll);
router.put ('/', upload.single("file"), update);
router.delete ('/', deleteProduct); 

module.exports = router;
