const { Router } = require('express');
const { check } = require('express-validator');

const { inputValidationResult } = require('../middlewares/validation-result');
const { tokenValidation } = require('../middlewares/validation-token');
const { isAdminRole } = require('../middlewares/validation-role');

const { categoryExist } = require('../helpers/input-validation');

const {
  getAllCategories,
  getCategory,
  newCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories.controllers');

const router = Router();

router.get('/', getAllCategories);

router.get(
  '/:id',
  [
    check('id', 'No existe la categoria.').custom(categoryExist),
    check('id', 'No es un ID valido.').isMongoId(),
    inputValidationResult,
  ],
  getCategory
);

router.post(
  '/new',
  [tokenValidation, check('name', 'El nombre de la categoria es obligatorio.').notEmpty(), inputValidationResult],
  newCategory
);

router.put(
  '/:id',
  [
    tokenValidation,
    check('id', 'No existe la categoria.').custom(categoryExist),
    check('id', 'No es un ID valido.').isMongoId(),
    check('name', 'El nuevo nombre de la categoria es requerido.').notEmpty(),
    inputValidationResult,
  ],
  updateCategory
);

router.delete(
  '/delete/:id',
  [
    [
      tokenValidation,
      isAdminRole,
      check('id', 'No es un ID valido.').isMongoId(),
      check('id', 'No existe la categoria.').custom(categoryExist),
      inputValidationResult,
    ],
  ],
  deleteCategory
);

module.exports = router;
