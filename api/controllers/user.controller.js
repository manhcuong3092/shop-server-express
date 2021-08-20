const User = require('../../models/user.model');
const date = require('date-and-time');
const md5 = require('md5');

module.exports.index = async function (req, res) {
  var users = await User.find();
  res.json(users);
};

module.exports.getOne = async function (req, res) {
  var user = await User.findById(req.params.userId);
  res.json(user);
}

module.exports.create = async function (req, res) {
  var now = new Date();
  var createdDate = date.format(now, 'YYYY-MM-DD HH:mm:ss');
  var user = {
    username: req.body.username,
    password: md5(req.body.password),
    email: req.body.email,
    fullname: req.body.fullname,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    role: req.body.role,
    avatar: "",
    accessAdminTool: false,
    createdBy: null,
    createdDate: createdDate,
    status: true
  };
  if(req.file){
    user.avatar = '/' + req.file.path.split('\\').slice(1).join('/');
  }
  if(req.body.accessAdminTool){
    user.accessAdminTool = true;
  }
  var user = await User.create(user);
  res.json(user);
};

module.exports.update = async function (req, res) {
  var now = new Date();
  var updatedDate = date.format(now, 'YYYY-MM-DD HH:mm:ss');
  var userId = req.params.userId;

  var userEdit = await User.findById(userId);
  userEdit.password = md5(req.body.password);
  userEdit.email = req.body.email;
  userEdit.fullname = req.body.fullname;
  userEdit.address = req.body.address;
  userEdit.phoneNumber = req.body.phoneNumber;
  userEdit.role = req.body.role;
  if(req.body.accessAdminTool){
    userEdit.accessAdminTool = true;
  }
  if(req.file){
    userEdit.avatar = '/' + req.file.path.split('\\').slice(1).join('/');
  }
  userEdit.updatedBy = null;
  userEdit.updatedDate = updatedDate;
  if(req.body.accessAdminTool){
    userEdit.accessAdminTool = true;
  }

  var user = await User.findByIdAndUpdate(
    req.params.userId, userEdit
  );

  res.json(user);
}

module.exports.delete = async function (req, res) {
  var user = await User.findByIdAndRemove(req.params.userId);
  res.json(user);
}
