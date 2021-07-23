const { request, response } = require('express');
const { body } = require('express-validator');
const { Product, Category } = require('../models');
const product = require('../models/product');

const getAllProducts = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.body;
  const query = { status: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query).populate('user', 'name').populate('category', 'name').limit(Number(limite)).skip(Number(desde)),
  ]);

  res.json({ total, products });
};

const getProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  res.json({ product });
};

const newProduct = async (req = request, res = response) => {
  try {
    const { status, user, ...body } = req.body;
    const data = {
      ...body,
      name: body.name.toUpperCase(),
      user: req.user._id,
    };

    const productName = await Product.findOne({ name: data.name });
    if (productName) return res.status(401).json({ msg: `Ya existe un producto con ese nombre.` });

    const product = await Product(data);
    await product.save();

    res.json({
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: `Error al tratar de guardar el producto.` });
  }
};

const updateProduct = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { status, user, ...body } = req.body;
    let data = {
      ...body,
      user: req.user._id,
    };

    if (data.name) {
      data.name = body.name.toUpperCase();
    }

    const categoryExist = Category.findById(data.category);
    // if (!categoryExist) return res.status(401).json({ msg: `La categoria con id ${data.category} no existe.` });
    // const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.json({
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: `Error al tratar de guardar el producto.` });
  }
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

  res.json({ product });
};

module.exports = {
  newProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
