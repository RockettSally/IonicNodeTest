'use strict'
const categoriaRepository = require('../repositories/categoria-repository');

function categoriaController(){

}

categoriaController.prototype.get = async (req, res) => {
    let lista = await new categoriaRepository().getAll();
    res.status(200).send(lista);
};

categoriaController.prototype.getById = async (req, res) => {
    let categoriaEncontrada = await new categoriaRepository().getById(req.params.id);
    res.status(200).send(categoriaEncontrada);
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