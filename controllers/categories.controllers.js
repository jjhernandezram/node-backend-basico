const { request, response } = require('express');

const { Category } = require('../models');

const getAllCategories = (req = request, res = response) => {
  res.json({ msg: 'enlistar todas categorias' });
};

const getCategory = (req = request, res = response) => {
  res.json({ msg: 'enlistar categoria' });
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

const updateCategory = (req = request, res = response) => {
  res.json({ msg: 'actualizar categoria' });
};

const deleteCategory = (req = request, res = response) => {
  res.json({ msg: 'borrar categoria' });
};

module.exports = {
  getAllCategories,
  getCategory,
  newCategory,
  updateCategory,
  deleteCategory,
};
