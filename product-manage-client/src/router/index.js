import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import UserRegister from '@/components/UserRegister'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/registry',
        name: 'UserRegister',
        component: UserRegister
    }
  ]
})
