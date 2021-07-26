const { User, Role, Category, Product } = require('../models');

const roleValidation = async (role = '') => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) throw new Error(`El rol ${role} no es un rol valido.`);
};

const emailValidation = async (email) => {
  const emailExist = await User.findOne({ email });
  if (emailExist) throw new Error(`El correo ${email} ya esta registrado.`);
};

const existUserById = async (id) => {
  const idExist = await User.findById(id);
  if (!idExist) throw new Error(`El usuario con el ID: ${id} no existe.`);
};

const categoryExist = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new Error(`No existe la categoria con el id ${id}.`);
};

const productExist = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error(`No existe el producto con el id ${id}.`);
};

const allowedCollections = async (c = '', collections = []) => {
  const include = collections.includes(c);
  if (!include) throw new Error({ msg: `La coleción ${c} no es permitida,  ${collections}.` });
  return true;
};

module.exports = {
  roleValidation,
  emailValidation,
  existUserById,
  categoryExist,
  productExist,
  allowedCollections,
};
