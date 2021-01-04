'use strict'

const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"test"',
  BASE_URL: '"https://shukran-staging-api.herokuapp.com/"'
})
