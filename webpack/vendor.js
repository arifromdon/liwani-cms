var webpack  = require('webpack')
var path     = require('path')
var packages = require('../package.json')

var vendorLibraries = Object.keys(packages.dependencies)
vendorLibraries.pop()
vendorLibraries.push('connect-history-api-fallback')

module.exports = {
  mode: 'none',
  entry: {
    vendor: vendorLibraries
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '..', 'public'),
    library: '[name]_lib',
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'public/[name]-manifest.json',
      name: '[name]_lib'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  node: { fs: 'empty' },
  externals: [{ './cptable': 'var cptable' }],
}
