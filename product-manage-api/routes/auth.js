var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var jwt = require('jsonwebtoken');

router.post('/login', function(request, response){
    User.findOne({
        email: request.body.email
    }, function(error, user){
        if(error)
            response.status(400).json({message: error});

        if(user){
            if(user.password === request.body.password){
                // get token, token expired in 1 hour
                jwt.sign({user: user.email}, request.app.get('public-key'), {expiresIn: 60 * 60},
                    function(error, token){
                        if(error)
                            response.status(400).json({message: error});

                        response.status(200).json({success: true, token: token, user_data: user});
                    }
                );
            }else{
                response.status(401).json({success: false, message: 'User authentication failed'});
            }
        }else{
            response.status(401).json({success: false, message: 'User authentication failed'});
        }
    });
});

router.use(function(request, response, next){
    var token = request.body.token || request.query.token || request.headers['x-access-token'];

    if(token){
        jwt.verify(token, request.app.get('public-key'), function(error, decoded){
            if(error)
                return response.status(401).json({success:false, message: error});

            request.decoded = decoded;    
            next();
        });
    }else{
        return response.status(403).send({success: false, message: 'Token not found'});
    }
});

module.exports = router;