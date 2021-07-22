const { Router } = require('express');
const { check } = require('express-validator');

const { inputValidationResult } = require('../middlewares/validation-result');
const { tokenValidation } = require('../middlewares/validation-token');

const {
  getAllCategories,
  getCategory,
  newCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories.controllers');

const router = Router();

router.get('/', [], getAllCategories);

router.get('/:id', [], getCategory);

router.post(
  '/new',
  [tokenValidation, check('name', 'El nombre de la categoria es obligatorio.').notEmpty(), inputValidationResult],
  newCategory
);

router.put('/:id', [tokenValidation, inputValidationResult], updateCategory);

router.delete('/delete/:id', [tokenValidation, inputValidationResult], deleteCategory);

module.exports = router;
