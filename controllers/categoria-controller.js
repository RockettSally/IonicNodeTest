'use strict'
const categoriaRepository = require('../repositories/categoria-repository');
const baseController = require('../bin/base/base-controller');
const _rep = new categoriaRepository();

function categoriaController(){

}

categoriaController.prototype.get = async (req, res) => {
    baseController.get(_rep, req, res);
};

categoriaController.prototype.getById = async (req, res) => {
    baseController.getById(_rep, req, res);
};

categoriaController.prototype.post = async (req, res) => {
    let resultado = await new categoriaRepository().create(req.body);
    res.status(201).send(resultado);
};

categoriaController.prototype.put = async (req, res) => {
    let resultado = await new categoriaRepository().update(req.params.id, req.body);
    res.status(202).send(resultado);
};

categoriaController.prototype.delete = async (req, res) => {
    let itemRemovido = await new categoriaRepository().delete(req.params.id);
    res.status(204).send(itemRemovido);
};

module.exports = categoriaController;