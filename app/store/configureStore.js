import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from 'redux'

import { persistStore, persistReducer } from 'redux-persist'
import { createLogger } from 'redux-logger'
import { cacheEnhancer } from 'redux-cache'
import localForage from 'localforage'
import thunk from 'redux-thunk'
import rootReducer from 'reducers/index'
import config from 'app/config'

const isDevelopment = config.node_env === 'development'

export const mainPersistConfig = {
  key: 'root',
  storage: localForage,
  debug: isDevelopment,
}

const middleware = [thunk]

if (isDevelopment) {
  middleware.push(createLogger())
}

const reducers = combineReducers({
  root: persistReducer(mainPersistConfig, rootReducer),
})

const enhancers = [applyMiddleware(...middleware)]
const persistConfig = { enhancers }
const store = createStore(reducers, undefined, compose(...enhancers, cacheEnhancer()))

if (isDevelopment && module.hot) {
  module.hot.accept('reducers', () => {
    const nextRootReducer = require('reducers').default // eslint-disable-line global-require
    store.replaceReducer(nextRootReducer)
  })
}

const persistor = persistStore(store, persistConfig, () => {
  if (isDevelopment) {
    console.log(store.getState()) // eslint-disable-line no-console
  }
})

/* eslint-disable arrow-body-style */
const configureStore = () => {
  // uncomment this for clearing redux persistor storage
  // if (isDevelopment) {
  //   persistor.purge()
  // }

  return { persistor, store }
}
/* eslint-enable arrow-body-style */

export default configureStore
