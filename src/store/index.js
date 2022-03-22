import { createStore } from 'vuex'
import { linkTemplate } from '@/utils/linkTemplate'

import {
  getAccessToken as getAToken,
  getRequestToken as getRToken,
  getLinks as getL,
  archiveLinks as archiveL
} from '@/services/pocketService'

export default createStore({
  state: {
    requestToken: window.localStorage.getItem('requestToken'),
    accessToken: window.localStorage.getItem('accessToken'),
    username: window.localStorage.getItem('username'),
    links: [],
    isLoading: false,
    isArchiving: false,
    archiveErrors: []
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
    },

    ARCHIVE_LINK (state, id) {
      const archivedLink = state.links.findIndex(l => l.item_id === id)

      if (archivedLink > -1) {
        state.links[archivedLink].archived = true
      } else {
        console.error(`Invalid ID: a link with ID \`${id}\` does not exist.`)
      }
    },

    TOGGLE_IS_LOADING (state) {
      state.isLoading = !state.isLoading
    },

    TOGGLE_IS_ARCHIVING (state) {
      state.isArchiving = !state.isArchiving
    },

    SET_ARCHIVE_ERRORS (state, errors) {
      state.archiveErrors = errors.filter(e => e)
    }
  },

  actions: {
    getRequestToken ({ commit, state }) {
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
      commit('DELETE_REQUEST_TOKEN')
      commit('DELETE_ACCESS_TOKEN')
      commit('DELETE_USERNAME')

      router.push('/')
    },

    getLinks ({ commit }) {
      commit('TOGGLE_IS_LOADING')

      return getL()
        .then(({ data }) => {
          commit('SET_LINKS', data)
        })
        .catch(e => {
          console.error(e)

          commit('SET_LINKS', [])
        })
        .finally(() => {
          commit('TOGGLE_IS_LOADING')
        })
    },

    archiveLinks ({ commit, getters, state }) {
      if (!state.links) {
        return
      }

      commit('TOGGLE_IS_ARCHIVING')

      return archiveL(getters.linkIDs)
        .then(({ data }) => {
          data.action_results.map((r, i) => {
            if (r) {
              commit('ARCHIVE_LINK', getters.linkIDs[i])
            }
          })

          if (data.action_errors) {
            commit('SET_ARCHIVE_ERRORS', data.action_errors)
          }

          commit('TOGGLE_IS_ARCHIVING')
        })
    }
  },

  getters: {
    linkIDs (state) {
      return state.links ? state.links.map(l => l.item_id) : undefined
    },

    linksText (state) {
      return state.links ? state.links.map(l => linkTemplate(l)).join('<hr />') : undefined
    },

    areLinksArchived (state) {
      return state.links.length && (state.links.filter(l => l.archived).length === state.links.length)
    },

    archiveErrorsText (state) {
      return state.archiveErrors.length > 0
        ? state.archiveErrors.map(e => `<p>${JSON.stringify(e)}</p>`)
        : false
    }
  },

  modules: {
  }
})
