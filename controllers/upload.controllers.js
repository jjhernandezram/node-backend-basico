const path = require('path');
const fs = require('fs');

const { request, response } = require('express');

const { fileUploading } = require('../helpers/fileupload');
const { User, Product } = require('../models');

const fileUpload = async (req = request, res = response) => {
  try {
    const filePath = await fileUploading(req.files);
    res.json({ filename: filePath });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateImg = async (req = request, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) return res.status(400).json({ msg: `No existe usuario con el ID: ${id}` });
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) return res.status(400).json({ msg: `No existe producto con el ID: ${id}` });
      break;

    default:
      break;
  }

  if (model.img) {
    const filePath = path.join(__dirname, '../uploads/', collection, model.img);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  const filename = await fileUploading(req.files, undefined, collection);
  model.img = filename;
  await model.save();

  res.json({ model });
};

const getImg = async (req = request, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) return res.status(400).json({ msg: `No existe usuario con el ID: ${id}` });
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) return res.status(400).json({ msg: `No existe producto con el ID: ${id}` });
      break;

    default:
      break;
  }

  if (model.img) {
    const filePath = path.join(__dirname, '../uploads/', collection, model.img);
    if (fs.existsSync(filePath)) return res.sendFile(filePath);
  }

  const image404 = path.join(__dirname, '../assets/no-image.jpg');
  res.sendFile(image404);
};

module.exports = { fileUpload, updateImg, getImg };
