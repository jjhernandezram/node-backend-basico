const { Router } = require('express');
const { check } = require('express-validator');

const { tokenValidation } = require('../middlewares/validation-token');
const { inputValidationResult } = require('../middlewares/validation-result');

const { categoryExist, productExist } = require('../helpers/input-validation');
const {
  newProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controllers');

const router = Router();

router.get('/', getAllProducts);

router.get(
  '/:id',
  [
    check('id', 'El ID del producto es requerido.').notEmpty(),
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom(productExist),
    inputValidationResult,
  ],
  getProduct
);

router.post(
  '/',
  [
    tokenValidation,
    check('name', 'El nombre del producto es requerido.').notEmpty(),
    check('description', 'La descripción del producto es requerido.').notEmpty(),
    check('category', 'No existe la categoria.').custom(categoryExist),
    check('category', 'No es un ID valido.').isMongoId(),
    inputValidationResult,
  ],
  newProduct
);

router.put(
  '/:id',
  [
    tokenValidation,
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom(productExist),
    inputValidationResult,
  ],
  updateProduct
);

router.delete(
  '/:id',
  [
    tokenValidation,
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom(productExist),
    inputValidationResult,
  ],
  deleteProduct
);

module.exports = router;
