import api from '@/services/ApiConnect'

/* Here create requests api functions */

export default {

    user_register(data){
        return api().post('users/new', data)
    },

    user_login(data){
        return api().post('auth/login', data)
    }

}