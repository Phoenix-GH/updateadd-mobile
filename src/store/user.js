// @flow

import { dispatchReducer, runReducers } from '../helpers/dispatch-and-reduce'
import C from '../constants'

export const initialState: UserStoreState = {
  user: null,
  loginPending: false,
  signUpPending: false,
  loginError: null,
  signUpError: null,
}

export const authDispatchers = {
  setLoginPending: dispatchReducer<UserStoreState, boolean>(
    C.LOGIN_USER_PENDING,
    (state, pending): UserStoreState => ({
      ...state,
      loginPending: pending,
    }),
  ),
  setLoginError: dispatchReducer<UserStoreState, ?ErrorResponseType>(
    C.LOGIN_USER_ERROR,
    (state, error): UserStoreState => ({
      ...state,
      loginError: error,
    }),
  ),
  loginUser: dispatchReducer<UserStoreState, UserLoginPayload>(
    C.LOGIN_USER,
    (state): UserStoreState => ({
      ...state,
    }),
  ),
  storeUser: dispatchReducer<UserStoreState, ?UserType>(
    C.LOGIN_STORE_USER,
    (state, user): UserStoreState => ({
      ...state,
      user,
    }),
  ),
  signUpUser: dispatchReducer<UserStoreState, UserSignUpPayload>(
    C.SIGNUP_USER,
    (state): UserStoreState => ({
      ...state,
      signUpPending: false,
    }),
  ),
  setSignUpPending: dispatchReducer<UserStoreState, boolean>(
    C.SIGNUP_USER_PENDING,
    (state, pending): UserStoreState => ({
      ...state,
      signUpPending: pending,
    }),
  ),
  setSignUpError: dispatchReducer<UserStoreState, ?ErrorResponseType>(
    C.SIGNUP_USER_ERROR,
    (state, error): UserStoreState => ({
      ...state,
      signUpError: error,
    }),
  ),
}

export const reducer = (state: UserStoreState = { ...initialState }, action: StandardAction): UserStoreState => runReducers(state, authDispatchers, action)
