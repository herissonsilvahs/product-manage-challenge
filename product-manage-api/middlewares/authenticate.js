var jwt = require('jsonwebtoken');

module.exports = function(request, response, next){
    var token = request.body.token || request.query.token || request.headers['x-access-token'];

    if(token){
        jwt.verify(token, request.app.get('public-key'), 
            function(error, decoded){
                if(error)
                    return response.status(401).json({success:false, message: error});

                request.decoded = decoded;    
                next();
            }
        );
    }else{
        return response.status(403).send({success: false, message: 'Token not found'});
    }
};