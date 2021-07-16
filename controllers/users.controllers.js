const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const usersGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { status: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    users,
  });
};

const usersPost = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt);

  await user.save();

  res.json({
    user,
  });
};

const usersPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    user,
  });
};

const usersPatch = (req = request, res = response) => {
  res.json({
    msg: 'patch API',
  });
};

const usersDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { status: false });

  res.json({
    user,
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
