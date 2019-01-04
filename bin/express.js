/**
 * MAIN
 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const variables = require('./configurations/variables');

/**
 * ROUTERS
 */
const routes = require('../routes/routes');

/**
 * WEB SERVER INVOKE
 */
const app = express();

/**
 * MONGODB CONNECTION - MONGOOSE
 */
mongoose.connect(variables.Database.connection, {useNewUrlParser: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api/categoria', routes.categoria);
app.use('/api/produto', routes.produto);

module.exports = app;