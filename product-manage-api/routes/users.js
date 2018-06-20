var express = require('express');
var router = express.Router();
var User = require('../models/userModel');

/* GET users listing. */
router.get('/', function(request, response, next) {
    User.find(function(error, user){  
        if(error)
           return next(error) // Send error for handlerErrorMiddleware
        response.status(200).json(user);
    });
});

router.post('/new/', function(request, response, next){
    var user = new User(request.body);
    user.save(function(error){
        if (error)
            return next(error)
        response.status(201).json({message:'success', user:user})
    });
});

router.put('/update/:id', function(request, response, next){
    User.findByIdAndUpdate(request.params.id, request.body, {new: true},
        function(error, user){
            if(error)
               return next(error)
            response.status(200).json({message: 'success', user: user});
        }
    );
});

router.delete('/delete/:id', function(request, response, next){
    User.findByIdAndDelete(request.params.id, function(error, user){
        if(error)
           return next(error)
        response.status(200).json({message: 'success', user: user});
    });
});

module.exports = router;
