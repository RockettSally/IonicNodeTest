require('../models/produto-model');
const repository = require('../bin/base/base-repository');

class produtoRepository {

    constructor(){
        this._base = new repository('Produto');
    }

    async getAll(){
        return await this._base.getAll();
    }

    async getById(id){
        return await this._base.getById(id);
    }

    async create(data){
        return await this._base.create(data);
    }

    async update(id, data){
        return await this._base.update(id, data);
    }

    async delete(id){
        return await this._base.delete(id);
    }
}

module.exports = produtoRepository;