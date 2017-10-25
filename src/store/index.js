// @flow
import thunk from 'redux-thunk'
import devTools from 'remote-redux-devtools'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reducer as formReducer } from 'redux-form'

import { AppNavigator } from '../screens'
import Screens from '../constants'

// Configure Navigation for Redux
const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams(Screens.HelloWorld));
const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state)
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
};

// Strange higher-order function to potentially modify the result
const logAction = store => next => (action) => {
  // Group these console logs into one closed group
  // console.groupCollapsed(`dispatching action => ${action.type}`)
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

  return result
}

const reducers = combineReducers({ form: formReducer, nav: navReducer })

export default() => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [thunk, sagaMiddleware, logAction]

  let middleware = applyMiddleware(...middlewares)

  if (process.env.NODE_ENV !== 'production') {
    middleware = compose(middleware, devTools({ name: 'nativestarterkit', realtime: true }))
  }

  const store = createStore(reducers, middleware)
  // generators.map(saga => sagaMiddleware.run(saga))

  // $FlowFixMe
  store.sagaMiddleware = sagaMiddleware

  return store
}
