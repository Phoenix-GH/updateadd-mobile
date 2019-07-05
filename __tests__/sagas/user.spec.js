// @flow

import { put, call } from 'redux-saga/effects'

import { loginUser } from '../../src/sagas/user'
import ApiService from '../../src/helpers/ApiServices'
import { authDispatchers } from '../../src/store/user'

const stepper = fn => mock => fn.next(mock).value

describe('login saga', () => {
  it('login fail', () => {
    const email = 'shane@clearsumm.it'
    const password = 'password'
    const step = stepper(loginUser(authDispatchers.loginUser.dispatch({ email, password })))
    expect(step()).toEqual(put(authDispatchers.setLoginPending.dispatch(true)))
    expect(step()).toEqual(call(ApiService.loginUser, { email, password }))
    step()
    expect(JSON.stringify(step())).toEqual(JSON.stringify(put(authDispatchers.setLoginPending.dispatch(false))))
  })
})
