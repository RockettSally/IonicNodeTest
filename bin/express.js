/**
 * MAIN
 */
const express = require('express');
const bodyParser = require('body-parser');

/**
 * ROUTERS
 */
const routes = require('../routes/routes');

/**
 * WEB SERVER INVOKE
 */
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api/categoria', routes.categoria);
app.use('/api/produto', routes.produto);

module.exports = app;