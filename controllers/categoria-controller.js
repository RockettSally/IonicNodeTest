'use strict'
require('../models/categoria-model');
const mongoose = require('mongoose');
const categoria = mongoose.model('Categoria');

function categoriaController(){

}

categoriaController.prototype.get = async (req, res) => {
    let lista = await categoria.find();
    res.status(200).send(lista);
};

categoriaController.prototype.getById = async (req, res) => {
    let categoriaEncontrada = await categoria.findById(req.params.id);
    res.status(200).send(categoriaEncontrada);
};

categoriaController.prototype.post = async (req, res) => {
    let novaCategoria = new categoria(req.body);
    let resultado = await novaCategoria.save();
    res.status(201).send(resultado);
};

categoriaController.prototype.put = async (req, res) => {
    await categoria.findByIdAndUpdate(req.params.id, { $set: req.body });
    let categoriaEncontrada = await categoria.findById(req.params.id);
    res.status(202).send(categoriaEncontrada);
};

categoriaController.prototype.delete = async (req, res) => {
    let itemRemovido = await categoria.findByIdAndDelete(req.params.id);
    res.status(204).send(itemRemovido);
};

module.exports = categoriaController;