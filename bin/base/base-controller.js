exports.get = async(repository, req, res) => {
    try {
        let resultado = await repository.getAll();
        res.status(200).send(resultado);
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: 'Erro no processamento da requisição', 
            error: err
        });
    }
};

exports.getById = async(repository, req, res) => {
    try {
        let id = req.params.id
        if(id){
            let resultado = await repository.getById(id);
            res.status(200).send(resultado);
        } else {
            res.status(400).send({
                message: 'O parâmetro ID precisa ser informado'
            }).end();
            return;
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: 'Erro no processamento da requisição', 
            error: err
        });
    }
};

exports.post = async(repository, validationContract, req, res) => {
    try {
        let data = req.body;
        if(!validationContract.isValid()){
            res.status(400).send({
                message: 'Existem dados inválidos na sua requisição', 
                validation: validationContract.errors()
            }).end();
            return;
        }
        let resultado = await repository.create(data);
        res.status(201).send(resultado);
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: 'Erro no processamento da requisição', 
            error: err
        });
    }
};

exports.put = async(repository, validationContract, req, res) => {
    try {
        let data = req.body;
        if(!validationContract.isValid()){
            res.status(400).send({
                message: 'Existem dados inválidos na sua requisição', 
                validation: validationContract.errors()
            }).end();
            return;
        }
        let resultado = await repository.update(req.params.id, data);
        res.status(202).send(resultado);
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: 'Erro no processamento da requisição', 
            error: err
        });
    }
};

exports.delete = async(repository, req, res) => {
    try {
        let id = req.params.id
        if(id){
            let resultado = await repository.delete(id);
            res.status(200).send({message: 'Registro excluído com sucesso!'});
        } else {
            res.status(400).send({
                message: 'O parâmetro ID precisa ser informado'
            }).end();
            return;
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: 'Erro no processamento da requisição', 
            error: err
        });
    }
};