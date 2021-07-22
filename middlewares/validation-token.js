const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const tokenValidation = async (req = request, res = response, next) => {
  token = req.header('x-token');
  if (!token) return res.status(401).json({ msg: `No hay token en la petición.` });

  try {
    const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await User.findById(uid);

    if (!user) return res.status(401).json({ msg: `El usuario no existe en la BD.` });

    if (!user.status) return res.status(401).json({ msg: `El usuario esta inhabilitado.` });

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: `Token no valido.` });
  }
};

module.exports = {
  tokenValidation,
};
