// @flow
import type { Saga } from 'redux-saga'
import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'

import Actions, { Roots } from '../constants'
import ApiService from '../helpers/ApiServices'
import { authDispatchers } from '../store/user'

function* loginUser(action: { type: string, payload: UserLoginPayload }): Saga<*> {
  // Set mode to pending
  yield put(authDispatchers.setLoginPending.dispatch(true))
  try {
    const response: SuccessResponseType = yield call(ApiService.loginUser, action.payload)
    yield put(authDispatchers.storeUser.dispatch(response.data.data))
    yield put(NavigationActions.navigate({ routeName: Roots.CreateCard }))
  } catch (e) {
    yield put(authDispatchers.setLoginError.dispatch(e))
  }
  yield put(authDispatchers.setLoginPending.dispatch(false))
}

function* signUpUser(action: { type: string, payload: UserSignUpPayload }): Saga<*> {
  // Set mode to pending
  yield put(authDispatchers.setSignUpPending.dispatch(true))
  try {
    const response: SuccessResponseType = yield call(ApiService.signUpUser, action.payload)
    yield put(authDispatchers.storeUser.dispatch(response.data.data))
    yield put(NavigationActions.navigate({ routeName: Roots.CreateCard }))
  } catch (e) {
    yield put(authDispatchers.setSignUpError.dispatch(e))
  }
  yield put(authDispatchers.setSignUpPending.dispatch(false))
}

function* sagas(): Saga<*> {
  /* eslint-disable */
  console.log('Auth sagas loaded')
  /* eslint-enable */
  yield takeLatest(Actions.LOGIN_USER, loginUser)
  yield takeLatest(Actions.SIGNUP_USER, signUpUser)
}

export {
  loginUser,
  signUpUser,
}
export default sagas
