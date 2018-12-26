const express = require('express');
const app = express();

app.listen(3000, () => {
    console.warn('Servidor API NoFood inicializado na porta 3000.');
})