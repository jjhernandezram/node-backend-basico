const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const { User } = require('../models');
const { generateJWT } = require('../helpers/jwt');
const { googleTokenVerify } = require('../helpers/google-verify');

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

const googleAuth = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, email, img } = await googleTokenVerify(id_token);
    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: '12345678',
        img,
        google: true,
      };
      user = new User(data);
      await user.save();
    }

    const token = await generateJWT(user.id);

    if (!user.status) {
      return res.status(401).json({ msg: 'Hable con el administrador, usuario inhabilitado.' });
    }

    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ msg: 'El token de Google no es valido.' });
  }
};

module.exports = {
  login,
  googleAuth,
};
