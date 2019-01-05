'use strict'
const usuarioRepository = require('../repositories/usuario-repository');
const baseController = require('../bin/base/base-controller');
const _rep = new usuarioRepository();
const validation = require('../bin/helpers/validation');
const validationContract = new validation();
const md5 =  require('md5');


function usuarioController(){
    
}

usuarioController.prototype.get = async (req, res) => {
    baseController.get(_rep, req, res);
};

usuarioController.prototype.getById = async (req, res) => {
    baseController.getById(_rep, req, res);
};

usuarioController.prototype.post = async (req, res) => {
    let validationContract = new validation();
    let data = req.body;
    validationContract.isRequired(data.nome, 'Informe seu nome');
    validationContract.isRequired(data.email, 'Informe seu e-mail');
    validationContract.isEmail(data.email, 'O E-mail informado é inválido');
    validationContract.isRequired(data.senha, 'A senha informada é obrigatória');
    validationContract.isRequired(data.senhaConfirmação, 'A senha de confirmação é obrigatória');
    validationContract.isTrue(data.senha !== data.senhaConfirmação, 'A Senha e a Confirmação não são iguais');

    let usuarioIsEmailExiste = await _rep.isEmailExiste(data.email);
    if(usuarioIsEmailExiste){
        validationContract.isTrue((usuarioIsEmailExiste.nome !== undefined),  `O e-mail ${data.email} já está cadastrado em nossa base de dados`);
    }
    data.senha = md5(data.senha);
    baseController.post(_rep, validationContract, data, res);
};

usuarioController.prototype.put = async (req, res) => {
    let validationContract = new validation();
    let data = req.body;
    validationContract.isRequired(req.params.id, 'Informe o ID do Usuário');
    validationContract.isRequired(data.nome, 'Informe seu nome');
    validationContract.isRequired(data.email, 'Informe seu e-mail');
    validationContract.isEmail(data.email, 'O E-mail informado é inválido');

    let usuarioIsEmailExiste = await _rep.isEmailExiste(data.email);
    if(usuarioIsEmailExiste){
        validationContract.isTrue((usuarioIsEmailExiste.nome !== undefined) && (usuarioIsEmailExiste._id !== req.params.id),  `O e-mail ${data.email} já está cadastrado em nossa base de dados`);
    }

    baseController.put(_rep, validationContract, data, res);
};

usuarioController.prototype.delete = async (req, res) => {
    baseController.delete(_rep, req, res);
};

module.exports = usuarioController;