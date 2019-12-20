import { compose, createStore } from 'redux'

import localForage from 'localforage'
import { offline } from '@redux-offline/redux-offline'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'
import reducers from './reducers'

const DEFAULT_STATE = {
  user: {
    state: 'disconnected',
    username: '',
    token: '',
    widgets: [],
  },
  api: {
    gmap: {
      token: 'AIzaSyBQvsE56gDNCZZ7gw_RT_D3RY1R0q3fei4',
    },
  },
  toasts: [],
  data: {
    steps: [],
    offers: [],
  },
}

const reduxOfflineConfig = {
  ...offlineConfig,
  persistOptions: {
    storage: localForage,
  },
}

const enhancer = compose(
  offline(reduxOfflineConfig),
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : x => x
)

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextGTR = require('./reducers').default
    store.replaceReducer(nextGTR)
  })
}

const store = createStore(reducers, DEFAULT_STATE, enhancer)

export default store
