import axios from 'axios'

/* This is implementation of comunication with api */

export default () => {
    return axios.create({
        baseURL: 'http://localhost:3000/api/v1/'
    })
}