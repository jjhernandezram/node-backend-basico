const { User, Role } = require('../models');

const roleValidation = async (role = '') => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) throw new Error(`El rol ${role} no un rol valido.`);
};

const emailValidation = async (email) => {
  const emailExist = await User.findOne({ email });
  if (emailExist) throw new Error(`El correo ${email} ya esta registrado.`);
};

const existUserById = async (id) => {
  const idExist = await User.findById(id);
  if (!idExist) throw new Error(`El usuario con el ID: ${id} no existe.`);
};

module.exports = {
  roleValidation,
  emailValidation,
  existUserById,
};
