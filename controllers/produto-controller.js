'use strict'
const produtoRepository = require('../repositories/produto-repository');

function produtoController(){

}

produtoController.prototype.get = async (req, res) => {
    let resultado = await new produtoRepository().getAll();
    res.status(200).send(resultado);
};

produtoController.prototype.getById = async (req, res) => {
    let resultado = await new produtoRepository().getById(req.params.id);
    res.status(200).send(resultado);
};

produtoController.prototype.post = async (req, res) => {
    let resultado = await new produtoRepository().create(req.body);
    res.status(201).send(resultado);
};

produtoController.prototype.put = async (req, res) => {
    let resultado = await new produtoRepository().update(req.params.id, req.body);
    res.status(202).send(resultado);
};

produtoController.prototype.delete = async (req, res) => {
    let itemRemovido = await new produtoRepository().delete(req.params.id);
    res.status(204).send(itemRemovido);
};

module.exports = produtoController;