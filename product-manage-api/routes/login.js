var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var jwt = require('jsonwebtoken');

router.post('/', function(request, response){
    User.findOne({
        email: request.body.email
    })
    .then((user)=>{
        if(user){
            if(user.password === request.body.password){

                const async_jwt = new Promise(
                    (resolve, reject) => {
                        // get token, token expired in 1 hour
                        jwt.sign(
                            {user: user.email},
                            request.app.get('public-key'),
                            {expiresIn: 60 * 60},
                            (error, token) => {
                                if(error)
                                    reject(error)
                                resolve(token)
                            }
                        )
                    }
                );

                async_jwt
                .then((token) => {
                    response.status(200).json({
                        success: true,
                        token: token,
                        user_data: user
                    });
                })
                .catch((error) => {
                    response.status(400).json({message: error});
                });

            }else{
                response.status(401).json({
                    success: false,
                    message: 'User authentication failed'
                });
            }
        }else{
            response.status(401).json({
                success: false,
                message: 'User authentication failed'
            });
        }
    })
    .catch((error)=>{
        response.status(400).json({message: error});
    })
});

module.exports = router;