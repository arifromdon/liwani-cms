var config            = require('./base')
var webpack           = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

config.entry.app = [
  '@babel/polyfill',
  'webpack/webpack-public-path.js',
  'app.js',
]

config.plugins.push(
  new HtmlWebpackPlugin({
    template: 'app/assets/index-prod.html.ejs',
    inject: false,
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
)

config.devtool = 'source-map'

module.exports = config
