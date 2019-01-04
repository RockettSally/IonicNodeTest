require('../models/categoria-model');
const mongoose = require('mongoose');
const categoriaModel = mongoose.model('Categoria');

class categoriaRepository {

    constructor(){

    }

    async getAll(){
        return await categoriaModel.find();
    }

    async getById(id){
        return await categoriaModel.findById(id);
    }

    async create(data){
        let categoria = new categoriaModel(data);
        let resultado = await categoria.save();
        return resultado;
    }

    async update(id, data){
        await categoriaModel.findByIdAndUpdate(id, { $set: data });
        let categoriaEncontrada = await categoriaModel.findById(id);
        return categoriaEncontrada;
    }

    async delete(id){
        return await categoriaModel.findByIdAndDelete(id);
    }
}

module.exports = categoriaRepository;