'use strict'

const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const PrerenderSPAPlugin = require('prerender-spa-plugin')
// Renders headlessly in a downloaded version of Chromium through puppeteer
const PuppeteerRenderer = PrerenderSPAPlugin.PuppeteerRenderer

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  // mode: 'development',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.stage.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.stage.env // THIS IS WHAT SETS THE .ENV, not anything else. not [context.*.*] in netlify.toml or in netlify UI Environment Variable 
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      serviceWorkerLoader: `<script>${fs.readFileSync(path.join(__dirname,
        './service-worker-dev.js'), 'utf-8')}</script>`
    }),
    /* new PrerenderSPAPlugin({ // https://youtu.be/pwHdFPEX4NA?t=760
      // Required - The path to the webpack-outputted app to prerender.
      staticDir: path.join(__dirname, '/../dist'), // The path to the folder where index.html is.
      // Required - list of Routes to render.
      routes: [ '/pricing', '/' ],
      maxConcurrentRoutes: 5,
      renderer: new PuppeteerRenderer({
        // Wait to render until the element specified is detected with document.querySelector.
        // renderAfterElementExists: '#app',
        timeout: 60000, // ??
        renderAfterTime: 10000, // ??
        headless: true,
        renderAfterDocumentEvent: 'render-event'
      }),
      // postProcess: (context) => { // TODO }
    }), */
    new FriendlyErrorsPlugin(), // seem this must be last
    
  ]
})
