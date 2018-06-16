var express = require('express');
var router = express.Router();
var User = require('../models/userModel');

/* GET users listing. */
router.get('/', function(request, response, next) {
    response.json({});
});

router.post('/new/', function(request, response, next){
    var user = new User(request.body);
    user.save();
    response.status(201).json(user);
});

module.exports = router;
