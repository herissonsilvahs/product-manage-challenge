var express = require('express');
var router = express.Router();
var User = require('../models/userModel');

/* GET users listing. */
router.get('/', function(request, response, next) {
    User.find()
    .then((users)=>{
        response.status(200).json(users)
    })
    .catch((error)=>{
        next(error)
    })
});

router.post('/new/', function(request, response, next){
    var user = new User(request.body);
    user.save()
    .then((user)=>{
        response.status(201).json({message:'success', user:user})
    })
    .catch((error)=>{
        next(error)
    });
});

router.put('/update/:id', function(request, response, next){
    User.findByIdAndUpdate(
        request.params.id,
        request.body,
        {new: true}
    )
    .then((user)=>{
        response.status(200).json({message: 'success', user: user})
    })
    .catch((error)=>{
        next(error)
    });
});

router.delete('/delete/:id', function(request, response, next){
    User.findByIdAndDelete(request.params.id)
    .then((user)=>{
        response.status(200).json({message: 'success', user: user})
    })
    .catch((error)=>{
        next(error)
    });
});

module.exports = router;
