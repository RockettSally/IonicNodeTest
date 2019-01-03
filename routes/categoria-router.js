'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoria-controller');

let categoriaController = new controller();

router.get('/', categoriaController.get);
router.get('/:id', categoriaController.getById);
router.post('/', categoriaController.post);
router.put('/:id', categoriaController.put);
router.delete('/:id', categoriaController.delete);

module.exports = router;