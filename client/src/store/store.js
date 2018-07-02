import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state:{
    token: null,
    user: null,
    userLogged: false,
    notifier: {
      visible: false,
      msg: null,
      type: null
    }
  },
  mutations:{
    SET_TOKEN(state, token){
      state.token = token
      if(token)
        state.userLogged=true
      else
        state.userLogged=false
    },
    SET_USER(state, user){
      state.user = user
    },
    SET_NOTIFIER(state, notifier){
      state.notifier = notifier
    }
  },
  actions:{
    setToken ({commit}, token){
      commit('SET_TOKEN', token)
    },
    setUser ({commit}, user){
      commit('SET_USER', user)
    },
    changeNotifier({commit}, notifier){
      commit('SET_NOTIFIER', notifier)
    }
  }
})