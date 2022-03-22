import axios from 'axios'

import store from '@/store'

const api = axios.create({
  baseURL: '/.netlify/functions/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export const getRequestToken = () => {
  return api.get('get-request-token')
}

export const getAccessToken = () => {
  const { requestToken } = store.state

  return api.post('get-access-token', { requestToken })
}

export const getLinks = () => {
  const { requestToken, accessToken } = store.state

  return api.post('get-links', {
    requestToken,
    accessToken
  }, {
    transformResponse: [data => {
      if (!data) {
        return []
      }

      const { list } = JSON.parse(data)

      if (!list || !Object.values(list).length > 0) {
        return []
      }

      return Object.values(list)
        .sort((a, b) => {
          return a.time_added - b.time_added
        })
        .map(i => {
          return {
            item_id: i.item_id,
            title: i.resolved_title,
            url: i.resolved_url,
            excerpt: i.excerpt,
            archived: (parseInt(i.status, 10) === 1)
          }
        })
    }]
  })
}

export const archiveLinks = (ids) => {
  const { requestToken, accessToken } = store.state

  return api.post('archive-links', {
    requestToken,
    accessToken,
    ids
  })
}
