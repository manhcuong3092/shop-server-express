const Contact = require('../../models/contact.model');
const date = require('date-and-time');

module.exports.index = async function (req, res) {
  var contacts = await Contact.find();
  res.json(contacts);
};

module.exports.getItem = async function (req, res) {
  var contact = await Contact.findById(req.params.contactId);
  res.json(contact);
}

module.exports.create = async function (req, res) {
  var now = new Date();
  var createdDate = date.format(now, 'YYYY-MM-DD HH:mm:ss');
  req.body.createDate = createdDate;
  var contact = await Contact.create(req.body);
  res.json(contact);
};

module.exports.delete = async function (req, res) {
  var contact = await Contact.findByIdAndRemove(req.params.contactId);
  res.json(contact);
}

module.exports.update = async function (req, res) {
  var updateItem = {};
  if (req.body.status) {
    updateItem['status'] = req.body.status;
  }
  var contact = await Contact.findByIdAndUpdate(
    req.params.contactId, updateItem
  );

  res.json(contact);
}
