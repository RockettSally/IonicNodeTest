'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario-controller');

let usuarioController = new controller();

router.get('/', usuarioController.get);
router.get('/:id', usuarioController.getById);
router.post('/', usuarioController.post);
router.put('/:id', usuarioController.put);
router.delete('/:id', usuarioController.delete);

module.exports = router;