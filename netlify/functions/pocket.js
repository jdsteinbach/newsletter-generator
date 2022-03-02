const Pocket = require('pocket-api')

require('dotenv').config()

const {
  POCKET_CONSUMER_KEY,
  VUE_APP_REDIRECT_URI
} = process.env

const pocket = new Pocket(POCKET_CONSUMER_KEY, VUE_APP_REDIRECT_URI)

module.exports = pocket
