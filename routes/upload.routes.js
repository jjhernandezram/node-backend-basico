const { Router } = require('express');
const { check } = require('express-validator');

const { fileUpload, updateImg, getImg } = require('../controllers/upload.controllers');
const { allowedCollections } = require('../helpers/input-validation');
const { fileValidation } = require('../middlewares/validation-file');
const { inputValidationResult } = require('../middlewares/validation-result');

const router = Router();

router.post('/', fileValidation, fileUpload);

router.put(
  '/:collection/:id',
  [
    check('id', 'No es un ID valido.').isMongoId(),
    check('collection').custom((c) => allowedCollections(c, ['users', 'products'])),
    fileValidation,
    inputValidationResult,
  ],
  updateImg
);

router.get(
  '/:collection/:id',
  [
    check('id', 'No es un ID valido.').isMongoId(),
    check('collection').custom((c) => allowedCollections(c, ['users', 'products'])),
    inputValidationResult,
  ],
  getImg
);

module.exports = router;
