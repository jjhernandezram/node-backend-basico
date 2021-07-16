const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        msg: 'El correo no esta registrado.',
      });

    if (!user.status)
      return res.status(400).json({
        msg: 'El usuario esta en status inactivo.',
      });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      return res.status(400).json({
        msg: 'La contraseña es incorrecta.',
      });

    const token = await generateJWT(user.id);

    res.json({ msg: 'Login ok', user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Ponganse en contacto con el administrador.',
    });
  }
};

module.exports = {
  login,
};
