import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import UserRegister from '@/components/UserRegister'
import UserLogin from '@/components/UserLogin'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/registry',
        name: 'user-registry',
        component: UserRegister
    }
  ]
})
