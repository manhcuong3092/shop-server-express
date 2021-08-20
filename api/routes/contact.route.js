var express = require('express');
var controller = require('../controllers/contact.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:contactId', controller.getItem);
router.post('/', controller.create);
router.patch('/:contactId', controller.update);
router.delete('/:contactId', controller.delete);

module.exports = router;