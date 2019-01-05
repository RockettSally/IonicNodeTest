require('../models/usuario-model');
const repository = require('../bin/base/base-repository');
const md5 = require('md5');

class usuarioRepository {

    constructor(){
        this._base = new repository('Usuario');
        this._projection = 'nome email _id foto'
    }

    async authenticate(_email, _senha){
        let hashSenha = md5(_senha);
        return await this._base._model.findOne({ 
            email: _email,
            senha: hashSenha
        }, this._projection);
    }

    async isEmailExiste(_email){
        return await this._base._model.findOne({email: _email}, this._projection);
    }

    async getAll(){
        return await this._base._model.find({}, this._projection);
    }

    async getById(id){
        return await this._base._model.findById(id, this._projection);
    }

    async create(data){
        let usuarioCriado = await this._base.create(data);
        return await this._base._model.findById(usuarioCriado._id, this._projection);
    }

    async update(id, data){
        let usuarioAtualizado = await this._base.update(id, {
            nome: data.nome,
            email: data.email,
            foto: data.foto
        })
        return await this._base._model.findById(usuarioAtualizado._id, this._projection);
    }

    async delete(id){
        return await this._base.delete(id);
    }
}

module.exports = usuarioRepository;