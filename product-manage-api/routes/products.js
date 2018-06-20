var express = require('express');
var router = express.Router();
var Product = require('../models/productModel');

router.get('/list', function(request, response, next) {
    Product.find(function(error, products){
        if(error)
            return next(error)
        response.status(200).json({message: 'success', products: products});
    });
});

router.get('/:id', function(request, response, next) {
    Product.findById(request.params.id, function(error, product){
        if(error)
            return next(error)
        response.status(200).json({message: 'success', product: product});
    });
});

router.get('/search/:query', function(request, response, next) {
    Product.find({name: { $regex: '.*' + request.params.query + '.*' , $options: "i"}},
        function(error, products){
            if(error)
                return next(error)
            response.status(200).json({message: 'success', products: products});
        }
    );
});

router.post('/new', function(request, response, next){
    var product = new Product(request.body);
    product.save(function(error){
        if (error)
            return next(error)
        response.status(201).json({message:'success', product:product})
    });
});

router.put('/update/:id', function(request, response, next){
    Product.findByIdAndUpdate(request.params.id, request.body, {new: true},
        function(error, product){
            if(error)
                return next(error)
            response.status(200).json({message: 'success', product: product});
        }
    );
});

router.delete('/delete/:id', function(request, response, next){
    Product.findByIdAndDelete(request.params.id, function(error, product){
        if(error)
            return next(error)
        response.status(200).json({message: 'success', product: product});
    });
});

module.exports = router;