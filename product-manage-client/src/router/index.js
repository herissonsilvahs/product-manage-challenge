import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import UserRegister from '@/components/UserRegister'
import UserLogin from '@/components/UserLogin'
import IndexDashboard from '@/components/dashboards/IndexDashboard'

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
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: IndexDashboard
    }
  ]
})
