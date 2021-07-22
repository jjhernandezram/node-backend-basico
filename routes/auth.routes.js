const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleAuth } = require('../controllers/auth.controllers');
const { inputValidationResult } = require('../middlewares/validation-result');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'El correo es obligatorio.').isEmail(),
    check('password', 'La contraseña es obligatoria.').notEmpty(),
    inputValidationResult,
  ],
  login
);

router.post('/google', [check('id_token', 'el ID token es necesario.').notEmpty(), inputValidationResult], googleAuth);

module.exports = router;
