import { createStore } from 'vuex'

import {
  getAccessToken as getAToken,
  getRequestToken as getRToken,
  getLinks as getL
} from '@/services/pocketService'

export default createStore({
  state: {
    requestToken: window.localStorage.getItem('requestToken'),
    accessToken: window.localStorage.getItem('accessToken'),
    username: window.localStorage.getItem('username'),
    links: []
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

    SET_LINKS (state, links) {
      state.links = [...links]
    },

    DELETE_REQUEST_TOKEN (state) {
      state.requestToken = ''
      window.localStorage.removeItem('requestToken')
    },

    DELETE_ACCESS_TOKEN (state) {
      state.accessToken = ''
      window.localStorage.removeItem('accessToken')
    },

    DELETE_USERNAME (state) {
      state.username = ''
      window.localStorage.removeItem('username')
    }
  },

  actions: {
    getRequestToken ({ commit, state }) {
      console.log('dispatch getRequestToken')

      if (state.requestToken) {
        commit('DELETE_REQUEST_TOKEN')
      }

      return getRToken()
        .then(({ data }) => {
          commit('SET_REQUEST_TOKEN', data.code)
        })
        .catch(e => {
          console.error(e)
        })
    },

    getAccessToken ({ commit, state }) {
      console.log('dispatch getAccessToken')

      if (state.accessToken) {
        return
      }

      return getAToken(state.requestToken)
        .then(({ data }) => {
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_USERNAME', data.username)
        })
        .catch(e => {
          console.error(e)
        })
    },

    resetTokens ({ commit, state }, router) {
      console.log('dispatch resetTokens')

      commit('DELETE_REQUEST_TOKEN')
      commit('DELETE_ACCESS_TOKEN')
      commit('DELETE_USERNAME')

      router.push('/')
    },

    getLinks ({ commit, state }) {
      const {
        accessToken,
        requestToken
      } = state

      return getL({
        accessToken,
        requestToken
      })
        .then(({ data }) => {
          commit('SET_LINKS', data)
        })
    }
  },

  modules: {
  }
})
