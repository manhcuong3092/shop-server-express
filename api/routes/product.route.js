var express = require('express');
var controller = require('../controllers/product.controller');
var router = express.Router();
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req,file,cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
      let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      cb(null, Date.now() + ext)
  }
});

const upload = multer({
  storage: storage
});

router.get('/', controller.index);
router.get('/:productId', controller.getItem);

router.post('/', 
  upload.single('avatar'), 
  controller.create,
);

router.put('/:productId', 
  upload.single('avatar'), 
  controller.replace
);

router.patch('/:productId', 
  upload.single('avatar'), 
  controller.update
);

router.delete('/:productId', controller.delete);

module.exports = router;