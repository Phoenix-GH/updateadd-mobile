// @flow

import devTools from 'remote-redux-devtools'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import UserStoreStateReducer, * as UserActions from './user'

import { generators } from '../sagas'

import { AppNavigator } from '../screens'

import { Roots } from '../constants'

// Configure Navigation for Redux
const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams(Roots.HelloWorld))

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state)
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
}

// Strange higher-order function to potentially modify the result
const logAction = store => next => (action) => {
  /* eslint-disable */
  if (!__DEV__) {
    console.log('BEFORE', JSON.stringify(store.getState()))
    console.log('ACTION', action.type, JSON.stringify(action))
  } else {
    console.log('BEFORE', store.getState())
    console.log('ACTION', action.type, action)
  }
  const result = next(action)
  if (!__DEV__) {
    console.log('AFTER', JSON.stringify(store.getState()))
  } else {
    console.log('AFTER', store.getState())
  }
  /* eslint-enable */
  return result
}

const reducers = combineReducers({
  user: UserStoreStateReducer,
  nav: navReducer,
})

export default {
  actions: {
    user: UserActions,
  },
  configureStore: () => {
    const sagaMiddleware = createSagaMiddleware()
    const middlewares = [
      sagaMiddleware,
      logAction,
    ]

    let middleware = applyMiddleware(...middlewares)

    if (process.env.NODE_ENV !== 'production') {
      middleware = compose(middleware, devTools({ name: 'nativestarterkit', realtime: true }))
    }

    const store = createStore(reducers, middleware)
    generators.map(saga => sagaMiddleware.run(saga))

    // $FlowFixMe
    store.sagaMiddleware = sagaMiddleware

    return store
  },
}
