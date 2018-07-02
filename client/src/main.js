// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {sync} from 'vuex-router-sync'
import store from '@/store/store'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

const unsync = sync(store, router)

Vue.filter('formatDate', function(date){
  return new Date(date).toLocaleDateString('pt-BR')
})

Vue.filter('formatPrice', function(price){
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  sharedState: store.state,
  router,
  store,
  components: { App },
  template: '<App/>'
})
