const { request, response } = require('express');

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) return res.status(500).json({ msg: `Se quiere verificar el rol sin validad el token.` });

  const { name, role } = req.user;
  if (role !== 'ADMIN_ROLE')
    return res.status(401).json({ msg: `El usuario ${name} no tiene privilegios o rol requerido.` });

  next();
};

const validRoles = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) return res.status(500).json({ msg: `Se quiere verificar el rol sin validad el token.` });

    if (!roles.includes(req.user.role))
      return res.status(401).json({ msg: `La petición requiere estos roles de usuario: ${roles}.` });
    next();
  };
};

module.exports = {
  isAdminRole,
  validRoles,
};
