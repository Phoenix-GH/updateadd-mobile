// @flow
import type { Saga } from 'redux-saga'
import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'

import Actions from '../constants'
import ApiService from '../helpers/ApiServices'
import { authDispatchers } from '../store/user'

function* loginUser(action: { type: string, payload: UserLoginPayload }): Saga<*> {
  // Set mode to pending
  yield put(authDispatchers.setPending.dispatch(true))
  try {
    const response: UserType = yield call(ApiService.loginUser, action.payload)
    yield put(authDispatchers.storeUser.dispatch(response))
  } catch (e) {
    yield put(authDispatchers.setError.dispatch(e))
  }
  yield put(authDispatchers.setPending.dispatch(false))
}

function* sagas(): Saga<*> {
  /* eslint-disable */
  console.log('Auth sagas loaded')
  /* eslint-enable */
  yield takeLatest(Actions.LOGIN_USER, loginUser)
}

export {
  loginUser,
}
export default sagas
