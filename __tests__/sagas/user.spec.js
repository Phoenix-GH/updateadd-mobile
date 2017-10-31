// @flow

import { put, call } from 'redux-saga/effects'

import { loginUser } from '../../src/sagas/user'
import ApiService from '../../src/services/api-service'
import store from '../../src/store'

const stepper = fn => mock => fn.next(mock).value

describe('login saga', () => {
  it('login fail', () => {
    const email = 'shane@clearsumm.it'
    const password = 'password'
    const step = stepper(loginUser(store.actions.user.dispatchLoginUser(email, password)))
    expect(step()).toEqual(put(store.actions.user.dispatchPending(true)))
    expect(step()).toEqual(call(ApiService.loginUser, { email, password }))
    step()
    expect(JSON.stringify(step())).toEqual(JSON.stringify(put(store.actions.user.dispatchPending(false))))
  })
})
