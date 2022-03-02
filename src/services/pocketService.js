import axios from 'axios'

const api = axios.create({
  baseURL: '/.netlify/functions/',
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json'
})

export const getToken = () => {
  return api.get('get-token')
}

export const authorize = (requestToken) => {
  return api.post('authorize', { requestToken })
}

export const getLinks = () => {
  return api.get('get-links')
}

export const deleteLink = (id) => {
  return api.post('delete-link', {
    id
  })
}
