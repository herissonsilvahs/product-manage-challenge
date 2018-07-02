var axios = require('axios')
user = require('../../config/seed-config.js')

var user_register = function(data){ 
    return(
        axios.create({
            baseURL: 'http://localhost:3000/api/v1/'
        }).post('users/new', data)
    )
}

var response = user_register(user)

if(response.status === 201)
    console.log("User created")
else
    console.log(response.status)
