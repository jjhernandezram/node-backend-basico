const { request, response } = require('express');

const { Category } = require('../models');

const getAllCategories = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.body;
  const query = { status: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(),
    Category.find(query).limit(Number(limite)).skip(Number(desde)).populate('user', 'name'),
  ]);

  res.json({
    total,
    categories,
  });
};

const getCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate('user', 'name');
  res.json({
    category,
  });
};

const newCategory = async (req = request, res = response) => {
  try {
    const name = req.body.name.toUpperCase();
    const categoryBD = await Category.findOne({ name });
    if (categoryBD) return res.status(400).json({ msg: `La categoria ${categoryBD.name}, ya existe.` });

    const data = {
      name,
      user: req.user._id,
    };

    const category = await new Category(data);
    await category.save();

    res.status(201).json({ category });
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: `Error al tratar de guardar la categoria.` });
  }
};

const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;
  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, data, { new: true });
  res.json({ category });
};

const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true });
  res.json({ category });
};

module.exports = {
  getAllCategories,
  getCategory,
  newCategory,
  updateCategory,
  deleteCategory,
};
