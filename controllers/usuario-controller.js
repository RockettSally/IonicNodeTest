'use strict'
const usuarioRepository = require('../repositories/usuario-repository');
const baseController = require('../bin/base/base-controller');
const _rep = new usuarioRepository();
const validation = require('../bin/helpers/validation');
const validationContract = new validation();
const md5 =  require('md5');
const jwt = require('jsonwebtoken');
const variables = require('../bin/configurations/variables');

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
    validationContract.isRequired(req.body.nome, 'Informe seu nome');
    validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    validationContract.isEmail(req.body.email, 'O E-mail informado é inválido');
    validationContract.isRequired(req.body.senha, 'A senha é obrigatória');
    validationContract.isRequired(req.body.senhaConfirmacao, 'A senha de confirmação é obrigatória');
    validationContract.isTrue(req.body.senha !== req.body.senhaConfirmacao, 'A Senha e a Confirmação não são iguais');

    let usuarioIsEmailExiste = await _rep.isEmailExiste(req.body.email);
    if(usuarioIsEmailExiste){
        validationContract.isTrue((usuarioIsEmailExiste.nome !== undefined),  `O e-mail ${req.body.email} já está cadastrado em nossa base de dados`);
    }

    if(req.body.senha){
        req.body.senha = md5(req.body.senha);
    }
    baseController.post(_rep, validationContract, req, res);
};

usuarioController.prototype.put = async (req, res) => {
    let validationContract = new validation();
    validationContract.isRequired(req.params.id, 'Informe o ID do Usuário');
    validationContract.isRequired(req.body.nome, 'Informe seu nome');
    validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    validationContract.isEmail(req.body.email, 'O E-mail informado é inválido');

    let usuarioIsEmailExiste = await _rep.isEmailExiste(req.body.email);
    if(usuarioIsEmailExiste){
        validationContract.isTrue((usuarioIsEmailExiste.nome != undefined) && (usuarioIsEmailExiste._id != req.params.id),  `O e-mail ${req.body.email} já está cadastrado em nossa base de dados`);
    }

    baseController.put(_rep, validationContract, req, res);
};

usuarioController.prototype.delete = async (req, res) => {
    baseController.delete(_rep, req, res);
};

usuarioController.prototype.auth = async (req, res) => {
    let validationContract = new validation();
    validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    validationContract.isEmail(req.body.email, 'O E-mail informado é inválido');
    validationContract.isRequired(req.body.senha, 'Informe sua senha');

    if(!validationContract.isValid()){
        res.status(400).send({message: 'Não foi possível efetuar o Login', validation: validationContract.errors()});
        return;
    }

    let resultado = await _rep.authenticate(req.body.email, req.body.senha);
    if(resultado){
        res.status(200).send({
            usuario: resultado,
            token: jwt.sign({user: resultado}, variables.Security.secretKey)
        })
    } else {
        res.status(404).send({message: 'Usuário e Senha informados são inválidos'});
    }
};

module.exports = usuarioController;