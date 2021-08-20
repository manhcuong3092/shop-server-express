const mongoose = require('mongoose');
const Product = require('../../models/product.model')
const date = require('date-and-time');

module.exports.index = async function (req, res) {
  var products = await Product.find();

  res.json(products);
};

module.exports.getItem = async function (req, res) {
  var product = await Product.findById(req.params.productId);
  res.json(product);
}

module.exports.create = async function (req, res) {
  var now = new Date();
  var createdDate = date.format(now, 'YYYY-MM-DD HH:mm:ss');
  var product = {
    name: req.body.name,
    category: mongoose.Types.ObjectId(req.body.category),
    price: parseFloat(req.body.price),
    shortDescription: req.body.shortDescription,
    detailDescription: req.body.detailDescription,
    sizes: req.body.sizes,
    colors: req.body.colors,
    avatar: "",
    createdBy: null,
    createdDate: createdDate,
    seo: req.body.seo
  };
  console.log(req.file);
  product.avatar = '/' + req.file.path.split('\\').slice(1).join('/');
  console.log(product.avatar);
  await Product.create(product); 
  var product = await Product.create(product);

  res.json(product);
};

module.exports.replace = async function (req, res) {
  var product = await Product.findByIdAndUpdate(
    req.params.productId,
    {
      "name": req.body.name,
      "image": req.body.image,
      "description": req.body.description
    }
  );

  res.json(product);
};

module.exports.update = async function (req, res) {
  var updateItem = {};
  if (req.body.name) {
    updateItem['name'] = req.body.name;
  }
  if (req.body.image) {
    updateItem['image'] = req.body.image;
  }
  if (req.body.description) {
    updateItem['description'] = req.body.description;
  }

  var product = await Product.findByIdAndUpdate(
    req.params.productId, updateItem
  );

  res.json(product);
}

module.exports.delete = async function (req, res) {
  var product = await Product.findByIdAndRemove(req.params.productId);
  res.json(product);
}