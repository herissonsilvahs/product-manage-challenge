var express = require('express');
var router = express.Router();
var Product = require('../models/productModel');

router.get('/list', function(request, response, next) {
    Product.find(function(error, products){
        if(error)
            response.status(400).json({message: error});
        response.status(200).json(products);
    });
});

router.get('/:id', function(request, response, next) {
    Product.findById(request.params.id, function(error, product){
        if(error)
            response.status(400).json({message: error});
        response.status(200).json(product);
    });
});

router.get('/search/:query', function(request, response, next) {
    Product.find({name: { $regex: '.*' + request.params.query + '.*' }},function(error, products){
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
    Product.findByIdAndUpdate(request.params.id, request.body, {new: true},
        function(error, product){
            if(error)
                response.status(400).json({message: error});

            response.status(200).json(product);
        }
    );
});

router.delete('/delete/:id', function(request, response, next){
    Product.findByIdAndDelete(request.params.id, function(error, product){
        if(error)
            response.status(400).json({message: error});

        response.status(200).json({message: 'removed', product: product});
    });
});

module.exports = router;