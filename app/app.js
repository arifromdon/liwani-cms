import { render } from 'react-dom'
import { flowRight } from 'lodash'
import { AppContainer } from 'react-hot-loader'
import 'styles'
import Root from 'containers/Root'
import configureStore from 'store/configureStore'

const { persistor, store } = configureStore()

const polyfillIntlIfNeeded = cb => () => {
  if (!global.Intl) {
    require.ensure([
      'intl',
      'intl/locale-data/jsonp/en.js',
    ], (require) => {
      require('intl')
      require('intl/locale-data/jsonp/en.js')
      cb()
    })
  } else {
    cb()
  }
}

const runApp = () => () => (
  render(
    <AppContainer>
      <Root
        store={store}
        persistor={persistor}
      />
    </AppContainer>, document.getElementById('mount'),
  )
)

const run = flowRight(
  polyfillIntlIfNeeded,
  runApp(),
)

run()

if (module.hot) {
  module.hot.accept('containers/Root', run)
}
