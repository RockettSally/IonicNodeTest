'use strict'

const app = require('../IonicNodeTest/bin/express');
const variables = require('../IonicNodeTest/bin/configurations/variables');

app.listen(variables.Api.port, () => {
    console.info(`[API No Food] -> Inicializada com sucesso na porta : ${variables.Api.port}`);
})
