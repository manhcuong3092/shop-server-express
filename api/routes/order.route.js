var express = require('express');
var controller = require('../controllers/order.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:orderId', controller.getItem);
router.post('/', controller.create);
router.patch('/:orderId', controller.update);
router.delete('/:orderId', controller.delete);

module.exports = router;