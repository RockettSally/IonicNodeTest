const jwt = require('jsonwebtoken');
const variables = require('../bin/configurations/variables')

module.exports = async(req, res, next) => {
    let token = req.body.token || req.query.query || req.headers['x-access-token'];
    if(token){
        try {
            let decoded = await jwt.verify(token, variables.Security.secretKey)
            req.usuarioLogado = decoded;
            next();
        } catch (err) {
            res.status(401).send({message: 'Houve um problema com sua autenticação: Faça o login novamente (invalidJsonWebToken)'});
        }
    } else {
        res.status(401).send({message: 'Acesso Negado: Você precisa esta logado para acessar esse recurso'});
        return;
    }
}