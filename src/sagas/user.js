// @flow

import { call, put, takeLatest, fork } from 'redux-saga/effects'

import Actions from '../constants'
import ApiService from '../services/api-service'
import store from '../store'

function* loginUser(action: { type: string, payload: { email: string, password: string } }): GeneratorType {
  // Set mode to pending
  yield put(store.actions.user.dispatchPending(true))

  try {
    const response: UserType = yield call(ApiService.loginUser, action.payload)
    yield put(store.actions.user.dispatchStoreUser(response))
  } catch (e) {
    yield put(store.actions.user.dispatchError(e))
  }
  yield put(store.actions.user.dispatchPending(false))
}

function* sagas(): GeneratorType {
  /* eslint-disable */
  console.log('Auth sagas loaded')
  /* eslint-enable */

  yield fork(takeLatest, Actions.LOGIN_USER, loginUser)
}

export {
  loginUser,
}
export default sagas
