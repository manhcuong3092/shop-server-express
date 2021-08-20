var express = require('express');
var controller = require('../controllers/user.controller');
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
router.get('/:userId', controller.getOne);

router.post('/',   
  upload.single('avatar'), 
  controller.create,
);

router.patch('/:userId', 
  upload.single('avatar'), 
  controller.create,
);

router.delete('/:userId', controller.delete);

module.exports = router;