import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    username: null,
    isUserLoggedIn: false,

  },
  mutations: {
    setToken(state, token) {
      state.token = token
      state.isUserLoggedIn = !!token
    },
    setUser(state, username) {
      state.username = username
    },
  },
  actions: {
    persistedLogin({commit}, data) {
      commit('setToken', data.token)
      commit('setUser', data.username)
    },
    logout({commit}) {
      commit('setToken', null)
      commit('setUser', null)
    },
  }
})