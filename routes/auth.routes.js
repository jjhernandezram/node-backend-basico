const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controllers');
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

module.exports = router;
