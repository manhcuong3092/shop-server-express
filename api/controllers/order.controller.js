const Order = require('../../models/order.model');
const date = require('date-and-time');

module.exports.index = async function (req, res) {
  var orders = await Order.find();
  res.json(orders);
};

module.exports.getItem = async function (req, res) {
  var order = await Order.findById(req.params.orderId);
  res.json(order);
}

module.exports.create = async function (req, res) {
  var now = new Date();
  var createdDate = date.format(now, 'YYYY-MM-DD HH:mm:ss');
  req.body.createDate = createdDate;
  var order = await Order.create(req.body);
  res.json(order);
};

module.exports.delete = async function (req, res) {
  var order = await Order.findByIdAndRemove(req.params.orderId);
  res.json(order);
}

module.exports.update = async function (req, res) {
  var updateItem = {};
  if (req.body.status) {
    updateItem['status'] = req.body.status;
  }
  var order = await Order.findByIdAndUpdate(
    req.params.orderId, updateItem
  );

  res.json(order);
}
