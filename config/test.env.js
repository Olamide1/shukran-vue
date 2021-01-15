'use strict'

const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  TIP_GUARD: 5,
  DEBUG_MODE: true,
  BASE_URL: '"https://shukran-staging-api.herokuapp.com"',
  URL: '"https://shukranstaging.netlify.app/"'
})
