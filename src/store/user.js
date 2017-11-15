// @flow

import C from '../constants'

export const initialState: UserStoreState = {
  user: null,
  pending: false,
}

export const dispatchPending = (pending: boolean) => ({
  type: C.LOGIN_USER_PENDING,
  payload: pending,
})

export const dispatchError = (error: ErrorType) => ({
  type: C.LOGIN_USER_ERROR,
  payload: error,
})

export const dispatchLoginUser = (email: string, password: string) => ({
  type: C.LOGIN_USER,
  payload: {
    email, password,
  },
})

export const dispatchStoreUser = (user: UserType) => ({
  type: C.LOGIN_STORE_USER,
  payload: user,
})

export default (state: UserStoreState = initialState, action: StandardAction) => {
  switch (action.type) {
    case C.LOGIN_USER_PENDING:
      return {
        ...state,
        pending: action.payload,
      }
    case C.LOGIN_USER_ERROR:
      return {
        ...state,
        resentCodeSuccess: null,
        error: action.payload,
      }
    case C.LOGIN_STORE_USER:
      return {
        ...state,
        user: action.payload,
      }
    default:
      break
  }
  return state
}
