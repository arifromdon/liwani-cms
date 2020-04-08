var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const env = require('dotenv').config()

var appConfig = {
  project_name: env.parsed.PROJECT_NAME || 'pinsar',
  node_env: env.parsed.NODE_ENV || 'development',
  auth_cookie_name: env.parsed.AUTH_COOKIE_NAME || 'ca_auth_token',
  api_url: env.parsed.API_URL || 'https://pinsar-api.ptape.com'
}

var postcssLoaderOptions = {
  plugins: function() {
    return [autoprefixer]
  }
}

var config = {
  cache: true,
  mode: 'none',
  entry: {},
  output: {
    path: path.join(__dirname, '..', 'public'),
    filename: (appConfig.node_env === 'production' ? 'javascripts/[name]-[hash].js' : 'javascripts/[name].js'),
    sourceMapFilename: (appConfig.node_env === 'production' ? 'javascripts/[name]-[hash].js.map' : 'javascripts/[name].js.map'),
  },
  optimization: {
    minimize: (appConfig.node_env === 'production' ? true : false)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        use: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader', options: postcssLoaderOptions }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader', options: postcssLoaderOptions },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: ['url-loader?limit=1000']
      },
      {
        test: /\.json$/,
        use: ['json-loader'],
        type: "javascript/auto"
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(eot|ttf|woff2?)$/,
        use: ['file-loader']
      },
      {
        test: /\.yml$/,
        use: ['yml-loader']
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
      },
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, '..', 'app'),
      path.join(__dirname, '..'),
      'node_modules'
    ],
    extensions: ['.jsx', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(appConfig.node_env),
        APP_CONFIG: JSON.stringify(appConfig)
      },
    }),
    new webpack.ProvidePlugin({ React: 'react' }),
    new CopyWebpackPlugin([
      { from: `app/assets/images/favicon-${appConfig.project_name}.png`, to: 'favicon.png' },
      { from: 'app/assets/images', to: 'assets' },
      { from: 'app/assets/fonts', to: 'assets/fonts' }
    ])
  ],
  devtool: process.env.DEVTOOL || 'cheap-module-eval-source-map'
}

module.exports = config
