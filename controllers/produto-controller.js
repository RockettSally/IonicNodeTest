'use strict'
require('../models/produto-model');
const mongoose = require('mongoose');
const produto = mongoose.model('Produto');

function produtoController(){

}

produtoController.prototype.get = async (req, res) => {
    let lista = await produto.find();
    res.status(200).send(lista);
};

produtoController.prototype.getById = async (req, res) => {
    let produtoEncontrado = await produto.findById(req.params.id);
    res.status(200).send(produtoEncontrado);
};

produtoController.prototype.post = async (req, res) => {
    let novoProduto = new produto(req.body);
    let resultado = await novoProduto.save();
    res.status(201).send(resultado);
};

produtoController.prototype.put = async (req, res) => {
    await produto.findByIdAndUpdate(req.params.id, { $set: req.body });
    let produtoEncontrado = await produto.findById(req.params.id);
    res.status(202).send(produtoEncontrado);
};

produtoController.prototype.delete = async (req, res) => {
    let itemRemovido = await produto.findByIdAndDelete(req.params.id);
    res.status(204).send(itemRemovido);
};

module.exports = produtoController;