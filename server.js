const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

let pessoas = [];

app.get('/', (req, res) => {
    res.status(200).send(pessoas);
});

app.post('/', (req, res) => {
    pessoas.push(req.body);
    res.status(201).send('Registro Criado');
});

app.put('/:id', (req, res) => {
    let pessoaEncontrada = pessoas.filter((pessoa) => {
        return pessoa.id === req.params.id;
    });
    pessoaEncontrada = req.body;
    res.status(202).send(pessoaEncontrada);
});

app.delete('/:id', (req, res) => {
    pessoas.splice(pessoas.findIndex((pes) => pes.id === req.params.id), 1);

    res.status(204).send('Registro Excluido.');
});

app.listen(3000, () => {
    console.warn('Servidor API NoFood inicializado na porta 3000.');
})