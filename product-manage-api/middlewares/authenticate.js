var jwt = require('jsonwebtoken');

module.exports = function(request, response, next){
    var token = request.body.token || request.query.token || request.headers['x-access-token'];

    if(token){
        const async_jwt = new Promise(
            (resolve, reject) => {
                jwt.verify(
                    token,
                    request.app.get('public-key'),
                    (error, decoded) => {
                        if(error)
                            reject(error)
                        resolve(decoded)
                    }
                );
            }
        );

        async_jwt
        .then((decoded)=>{
            request.decoded = decoded;    
            next();
        })
        .catch((error)=>{
            response.status(401).json({
                success:false,
                message: error
            })
        });
    }else{
        return response.status(403).send({
            success: false,
            message: 'Token not found'
        });
    }
};