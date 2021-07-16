const { Router } = require('express');
const { check } = require('express-validator');

const { inputValidationResult } = require('../middlewares/validation-result');
const { usersGet, usersPost, usersPatch, usersPut, usersDelete } = require('../controllers/users.controllers');
const { roleValidation, emailValidation, existUserById } = require('../helpers/input-validation');

const router = Router();

router.get('/', usersGet);

router.post(
  '/',
  [
    check('name', 'El nombre de usuario es requerido.').notEmpty(),
    check('email', 'No es un correo electronico valido.').isEmail(),
    check('email').custom(emailValidation),
    check('password', 'La contraseña debe tener al menos 8 caracteres.').isLength({ min: 8 }),
    check('role').custom(roleValidation),
    inputValidationResult,
  ],
  usersPost
);

router.put(
  '/:id',
  [
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(roleValidation),
    inputValidationResult,
  ],
  usersPut
);

router.delete(
  '/:id',
  [check('id', 'No es un ID valido.').isMongoId(), check('id').custom(existUserById), inputValidationResult],
  usersDelete
);

router.patch('/', usersPatch);

module.exports = router;
