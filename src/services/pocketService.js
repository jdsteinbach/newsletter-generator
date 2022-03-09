import axios from 'axios'

const api = axios.create({
  baseURL: '/.netlify/functions/',
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json'
})

export const getRequestToken = () => {
  return api.get('get-request-token')
}

export const getAccessToken = (requestToken) => {
  return api.post('get-access-token', { requestToken })
}

export const getLinks = (tokens) => {
  return api.post('get-links', tokens, {
    transformResponse: [data => {
      const { list } = JSON.parse(data)

      return Object.values(list)
        .sort((a, b) => {
          return a.time_added - b.time_added
        })
        .map(i => {
          return {
            item_id: i.item_id,
            title: i.resolved_title,
            url: i.resolved_url,
            excerpt: i.excerpt
          }
        })
    }]
  })
}

export const deleteLink = (id) => {
  return api.post('delete-link', {
    id
  })
}
