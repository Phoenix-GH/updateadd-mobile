// @flow
import type { Saga } from 'redux-saga'
import {
  call,
  put,
  takeLatest,
  fork,
} from 'redux-saga/effects'

import Actions from '../constants'
import ApiService from '../services/ApiServices'
import store from '../store'

function* loginUser(action: { type: string, payload: { email: string, password: string } }): Saga<*> {
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

function* sagas(): Saga<*> {
  /* eslint-disable */
  console.log('Auth sagas loaded')
  /* eslint-enable */
  yield fork(takeLatest, Actions.LOGIN_USER, loginUser)
}

export {
  loginUser,
}
export default sagas
