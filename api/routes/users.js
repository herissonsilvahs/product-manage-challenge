const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

/* GET users listing. */
router.get('/', (request, response, next) => {
    User.find()
    .then((users) => {
        response.status(200).json(users)
    })
    .catch((error) => {
        next(error)
    })
});

router.post('/new/', (request, response, next) => {
    const user = new User(request.body);
    user.save()
    .then((user) => {
        response.status(201).json({message:'success', user:user})
    })
    .catch((error) => {
        next(error)
    });
});

router.put('/update/:id', (request, response, next) => {
    User.findByIdAndUpdate(
        request.params.id,
        request.body,
        {new: true}
    )
    .then((user) => {
        response.status(200).json({message: 'success', user: user})
    })
    .catch((error) => {
        next(error)
    });
});

router.delete('/delete/:id', (request, response, next) => {
    User.findByIdAndDelete(request.params.id)
    .then((user) => {
        response.status(200).json({message: 'success', user: user})
    })
    .catch((error) => {
        next(error)
    });
});

module.exports = router;
