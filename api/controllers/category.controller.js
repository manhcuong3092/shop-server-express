const Category = require('../../models/category.model');
const date = require('date-and-time');

module.exports.index = async function (req, res) {
  var categories = await Category.find();
  res.json(categories);
};

module.exports.getItem = async function (req, res) {
  var category = await Category.findById(req.params.categoryId);
  res.json(category);
}

module.exports.create = async function (req, res) {
  var category = await Category.create(req.body);
  res.json(category);
};

module.exports.replace = async function (req, res) {
  var category = await Category.findByIdAndUpdate(
    req.params.categoryId,
    {
      "name": req.body.name,
      "description": req.body.description
    }
  );
  res.json(category);
};

module.exports.update = async function (req, res) {
  var updateItem = {};
  if (req.body.name) {
    updateItem['name'] = req.body.name;
  }
  if (req.body.description) {
    updateItem['description'] = req.body.description;
  }

  var category = await Category.findByIdAndUpdate(
    req.params.categoryId, updateItem
  );

  res.json(category);
}


module.exports.delete = async function (req, res) {
  var category = await Category.findByIdAndRemove(req.params.categoryId);
  res.json(category);
}