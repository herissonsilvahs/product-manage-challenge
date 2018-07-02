import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Dashboard from '@/components/dashboards/IndexDashboard'
import ProfileDashboard from '@/components/dashboards/ProfileDashboard'
import ProductDashboard from '@/components/dashboards/ProductDashboard'

Vue.use(Router)

export default new Router({

  routes: [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [
      { 
        path: '/dashboard/profile/:action',
        name: 'profile_dashboard',
        component: ProfileDashboard
      },
      { 
        path: '/dashboard/product/:action',
        name: 'product_dashboard',
        component: ProductDashboard
      }
    ]
  }
  ]
})
