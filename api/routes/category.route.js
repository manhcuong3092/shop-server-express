var express = require('express');
var controller = require('../controllers/category.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:categoryId', controller.getItem);
router.post('/', controller.create);
router.put('/:categoryId', controller.replace);
router.patch('/:categoryId', controller.update);
router.delete('/:categoryId', controller.delete);

module.exports = router;