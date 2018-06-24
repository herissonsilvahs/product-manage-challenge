const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

router.get('/list', (request, response, next) => {
    Product.find()
    .then((products) => {
        response.status(200).json({message: 'success', products: products})
    })
    .catch((error) => {
        next(error)
    });
});

router.get('/:id', (request, response, next) => {
    Product.findById(request.params.id)
    .then((product) => {
        response.status(200).json({message: 'success', product: product})
    })
    .catch((error) => {
        next(error)
    });
});

router.get('/search/:query', (request, response, next) => {
    Product.find({
        name: {$regex:'.*'+request.params.query+'.*',$options:"i"}
    }).then((products) => {
        response.status(200).json({message: 'success', products: products})
    }).catch(()=>{
        next(error)
    });
});

router.post('/new', (request, response, next) => {
    const product = new Product(request.body);
    product.save()
    .then((product) => {
        response.status(201).json({message:'success', product:product})
    })
    .catch((error) => {
        next(error)
    });
});

router.put('/update/:id', (request, response, next) => {
    Product.findByIdAndUpdate(
        request.params.id,
        request.body,
        {new: true}
    )
    .then((product) => {
        response.status(200).json({message: 'success', product: product})
    })
    .catch((error) => {
        next(error)
    });
});

router.delete('/delete/:id', (request, response, next) => {
    Product.findByIdAndDelete(request.params.id)
    .then((product) => {
        response.status(200).json({message: 'success', product: product})
    })
    .catch((error) => {
        next(error)
    });
});

module.exports = router;