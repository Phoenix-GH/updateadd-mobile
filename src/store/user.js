// @flow

import { dispatchReducer, runReducers } from '../helpers/dispatch-and-reduce'
import C from '../constants'

export const initialState: UserStoreState = {
  user: null,
  pending: false,
  error: null,
}

export const authDispatchers = {
  setPending: dispatchReducer<UserStoreState, boolean>(C.LOGIN_USER_PENDING, (state, pending): UserStoreState => ({ ...state, pending })),
  setError: dispatchReducer<UserStoreState, ?ErrorType>(C.LOGIN_USER_ERROR, (state, error): UserStoreState => ({ ...state, error })),
  loginUser: dispatchReducer<UserStoreState, UserLoginPayload>(C.LOGIN_USER, (state): UserStoreState => ({ ...state })),
  storeUser: dispatchReducer<UserStoreState, ?UserType>(C.LOGIN_STORE_USER, (state, user): UserStoreState => ({ ...state, user })),
}

export const reducer = (state: UserStoreState = { ...initialState }, action: StandardAction): UserStoreState => runReducers(state, authDispatchers, action)
