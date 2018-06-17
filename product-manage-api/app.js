var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const cors = require('cors')
var configs = require('./configs.js');

var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

var app = express();

var db = mongoose.connect(configs.mongo_uri);

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.set('public-key', configs.secret); // public key for jwt token generation

app.use(cors())

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth/products', productsRouter);

module.exports = app;
