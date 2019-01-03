'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/produto-controller');

let produtoController = new controller();

router.get('/', produtoController.get);
router.get('/:id', produtoController.getById);
router.post('/', produtoController.post);
router.put('/:id', produtoController.put);
router.delete('/:id', produtoController.delete);

module.exports = router;