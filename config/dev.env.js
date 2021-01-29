'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  TIP_GUARD: 3,
  DEBUG_MODE: true,
  BASE_URL: '"http://localhost:3000"',
  URL: '"http://localhost:8080"'
})
