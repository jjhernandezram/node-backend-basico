const { Router } = require('express');
const { search } = require('../controllers/search.controllers');

const router = Router();

router.get('/:collection/:param', search);

module.exports = router;
