var express = require('express');
var router = express.Router();
var Product = require('../models/productModel');

router.get('/list', function(request, response, next) {
    Product.find({}, function(error, products){
        if(error)
            response.status(400).json({message: error});
        response.status(200).json(products);
    });
});

router.post('/new', function(request, response, next){
    var product = new Product(request.body);
    product.save();
    response.status(201).json(product);
});

router.put('/update/:id', function(request, response, next){
    Product.findById(request.params.id, function(error, product){
        if(error)
            response.status(400).json({message: error});

        product.name = request.body.name;
        product.price = request.body.price;
        product.description = request.body.description;
        product.duedate = request.body.duedate;

        response.status(200).json(product);
    });
});

router.delete('/delete/:id', function(request, response, next){
    Product.findById(request.params.id, function(error, product){
        if(error)
            response.status(400).json({message: error});

        product.remove(function(error){
            if(error)
                response.status(400).json({message: error});

            response.status(200).json({message: 'removed', product: product});
        });
    });
});

module.exports = router;