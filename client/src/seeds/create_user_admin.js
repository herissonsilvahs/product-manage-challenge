const axios = require('axios')
user = require('../../config/seed-config.js')

const API = () => {
    return axios.create({
        baseURL: 'http://localhost:3000/api/v1/'
    })
}

const request = (data) => {
    return API().post('users/new', data)
}

request(user)
.then(()=>{
  console.log("User created")
})
.catch((error)=>{
  console.log(error.response.data.Error)
})
