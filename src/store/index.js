// @flow

import {
  compose,
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createNavigationReducer } from 'react-navigation-redux-helpers'

import * as user from './user'
import * as contacts from './contacts'

import { generators } from '../sagas'
import { AppNavigator, navigationMiddleware } from '../screens'

// Strange higher-order function to potentially modify the result
const logAction = store => next => (action) => { // eslint-disable-line
  /* eslint-disable */
  // if (!__DEV__) {
  //   console.log('BEFORE', JSON.stringify(store.getState()))
  //   console.log('ACTION', action.type, JSON.stringify(action))
  // } else {
  //   console.log('BEFORE', store.getState())
  //   console.log('ACTION', action.type, action)
  // }
  const result = next(action)
  // if (!__DEV__) {
  //   console.log('AFTER', JSON.stringify(store.getState()))
  // } else {
  //   console.log('AFTER', store.getState())
  // }
  /* eslint-enable */
  return result
}

export default {
  actions: {
    user,
    contacts,
  },
  configureStore: () => {
    const reducers = combineReducers({
      contacts: contacts.reducer,
      user: user.reducer,
      nav: createNavigationReducer(AppNavigator),
    })

    const sagaMiddleware = createSagaMiddleware()
    const middlewares = [
      sagaMiddleware,
      logAction,
      navigationMiddleware,
    ]
    let middleware = applyMiddleware(...middlewares)
    if (process.env.NODE_ENV !== 'production') {
      const { devToolsExtension } = window // eslint-disable-line no-undef
      if (typeof devToolsExtension === 'function') {
        middleware = compose(
          middleware,
          devToolsExtension(),
        )
      }
    }

    const store = createStore<any, any, any>(reducers, {}, middleware)
    generators.map(saga => sagaMiddleware.run(saga))

    store.sagaMiddleware = sagaMiddleware

    return store
  },
}
