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

/* handlerErrorMiddleware */
app.use(function(error, request, response, next){
    /* 
     * Crash problem after error resolve.
     * This return error for express and after
     * send response
     */
    if(response.headersSent)
        next(error)
    response.status(401).json({Error: error})
})

app.use('/api/v1/auth/products', productsRouter);

/* handlerErrorMiddleware */
app.use(function(error, request, response, next){
    next(error)
    response.status(401).json({Error: error})
})

module.exports = app;
