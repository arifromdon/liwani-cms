var history = require('connect-history-api-fallback')
var express = require('express')
var app = express()
var port = process.env.PORT || 8082

if (process.env.NODE_ENV !== 'production') {
  var config = require('./webpack/development')
  var webpack = require('webpack')
  var webpackDevMiddleware = require('webpack-dev-middleware')
  var webpackHotMiddleware = require('webpack-hot-middleware')
  var compiler = webpack(config)
  
  app.use(
    webpackDevMiddleware(compiler, {
      logLevel: 'silent'
    })
  )

  app.use(webpackHotMiddleware(compiler))
}

app.use(history())
app.use(express.static('public'))

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
