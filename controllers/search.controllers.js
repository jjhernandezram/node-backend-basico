const { request, response } = require('express');
const { User, Category, Product } = require('../models');
const { ObjectId } = require('mongoose').Types;

const collections = ['users', 'categories', 'products'];

const findUsers = async (param = '', res = response) => {
  const validId = ObjectId.isValid(param);
  try {
    if (validId) {
      const user = await User.findById(param);
      return res.json({ result: user ? [user] : [] });
    }

    const regexp = RegExp(param, 'i');

    const total = await User.countDocuments({ $or: [{ name: regexp }, { email: regexp }], $and: [{ status: true }] });
    const user = await User.find({ $or: [{ name: regexp }, { email: regexp }], $and: [{ status: true }] });
    return res.json({ total, result: user ? [user] : [] });
  } catch (error) {
    console.log(error);
  }
};

const findCategories = async (param = '', res = response) => {
  const validId = ObjectId.isValid(param);
  try {
    if (validId) {
      const category = await Product.findById(param);
      return res.json({ result: category ? [category] : [] });
    }

    const regexp = RegExp(param, 'i');

    const total = await Product.countDocuments({ name: regexp, status: true });
    const categories = await Category.find({ name: regexp, status: true });

    return res.json({ total, result: categories ? [categories] : [] });
  } catch (error) {
    console.log(error);
  }
};

const findProducts = async (param = '', res = response) => {
  const validId = ObjectId.isValid(param);
  try {
    if (validId) {
      const product = await Product.findById(param).populate('category', 'name');
      return res.json({ result: product ? [product] : [] });
    }

    const regexp = RegExp(param, 'i');

    const total = await Product.countDocuments({ $or: [{ name: regexp }, { description: regexp }] });
    const products = await Product.find({ $or: [{ name: regexp }, { description: regexp }] }).populate(
      'category',
      'name'
    );

    return res.json({ total, result: products ? [products] : [] });
  } catch (error) {
    console.log(error);
  }
};

const search = (req = request, res = response) => {
  const { collection, param } = req.params;

  if (!collections.includes(collection))
    return res
      .status(400)
      .json({ msg: `No existe ninguna coleccion ${collection}, colecciones permitias ${collections}` });

  switch (collection) {
    case 'users':
      findUsers(param, res);
      break;

    case 'categories':
      findCategories(param, res);
      break;

    case 'products':
      findProducts(param, res);
      break;

    default:
      res.status(500).json({ msg: `Pendiente definir busqueda... pongase en contacto con el administrador` });
      break;
  }
};

module.exports = {
  search,
};
