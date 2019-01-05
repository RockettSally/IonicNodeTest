'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario-controller');
const auth = require('../middleware/authentication')

let usuarioController = new controller();

router.post('/autenticar', usuarioController.auth);

router.get('/', usuarioController.get);
router.get('/:id', auth, usuarioController.getById);
router.post('/', usuarioController.post);
router.put('/:id', auth, usuarioController.put);
router.delete('/:id', auth, usuarioController.delete);

module.exports = router;