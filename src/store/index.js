import { createStore } from 'vuex'

import {
  authorize,
  getToken as getRequestToken
} from '@/services/pocketService'

export default createStore({
  state: {
    requestToken: window.localStorage.getItem('requestToken'),
    accessToken: window.localStorage.getItem('accessToken'),
    username: window.localStorage.getItem('username')
  },

  mutations: {
    SET_REQUEST_TOKEN (state, requestToken) {
      state.requestToken = requestToken
      window.localStorage.setItem('requestToken', requestToken)
    },

    SET_ACCESS_TOKEN (state, accessToken) {
      state.accessToken = accessToken
      window.localStorage.setItem('accessToken', accessToken)
    },

    SET_USERNAME (state, username) {
      state.username = username
      window.localStorage.setItem('username', username)
    },

    DELETE_REQUEST_TOKEN (state) {
      state.requestToken = ''
      window.localStorage.removeItem('requestToken')
    }
  },

  actions: {
    getToken ({ commit, state }) {
      if (state.requestToken) {
        commit('DELETE_REQUEST_TOKEN')
      }

      return getRequestToken()
        .then(({ data }) => {
          commit('SET_REQUEST_TOKEN', data.code)
        })
        .catch(e => {
          console.error(e)
        })
    },

    authorize ({ commit, state }) {
      return authorize(state.requestToken)
        .then(({ data }) => {
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_USERNAME', data.username)
        })
        .catch(e => {
          console.error(e)
        })
    }
  },

  modules: {
  }
})
