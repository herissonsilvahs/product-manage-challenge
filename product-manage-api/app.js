const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')

const configs = require('./configs.js');

const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

/* Middleware de autenticação */
const auth_mw = require('./middlewares/authenticate');

const app = express();
const db = mongoose.connect(configs.mongo_uri);

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.set('public-key', configs.secret); // public key for jwt token generation

app.use(cors())

app.use('/api/v1/login', loginRouter);
app.use('/api/v1/users', usersRouter);

/* handlerErrorMiddleware */
app.use((error, request, response, next) => {
    /* 
     * Crash problem after error resolve.
     * This return error for express and after
     * send response
     */
    if(response.headersSent)
        next(error)
    response.status(401).json({Error: error})
})

app.use('/api/v1/auth/products', auth_mw, productsRouter);

/* handlerErrorMiddleware */
app.use((error, request, response, next) => {
    next(error)
    response.status(401).json({Error: error})
})

module.exports = app;
