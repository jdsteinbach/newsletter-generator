const Pocket = require('pocket-api')

require('dotenv').config()

const {
  POCKET_CONSUMER_KEY
} = process.env

const pocket = new Pocket(POCKET_CONSUMER_KEY)

module.exports = pocket
