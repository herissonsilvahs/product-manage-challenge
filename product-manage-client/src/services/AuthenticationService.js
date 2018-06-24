import api from '@/services/ApiConnect'

/* Here create requests api functions */

export default {

    user_register(data){
        return api().post('users/new', data)
    },

    user_login(data){
        return api().post('/login', data)
    },

    product_list(token){
        return api().get('auth/products/list', {
            headers: {
                'x-access-token': token
            }
        })
    },

    product_get(id, token){
        return api().get('auth/products/'+id, {
            headers: {
                'x-access-token': token
            }
        })
    },

    new_product(data, token){
        return api().post('auth/products/new', data, {
            headers: {
                'x-access-token': token
            }
        })
    },

    update_product(id, data, token){
        return api().put('auth/products/update/'+id, data, {
            headers: {
                'x-access-token': token
            }
        })
    },

    remove_product(id, token){
        return api().delete('auth/products/delete/'+id, {
            headers: {
                'x-access-token': token
            }
        })
    },

    product_search(query, token){
        return api().get('auth/products/search/'+query, {
            headers: {
                'x-access-token': token
            }
        })
    }

}