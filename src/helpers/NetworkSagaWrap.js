// @flow

import update from 'immutability-helper'
import { call, put, fork } from 'redux-saga/effects'

type PayloadFunc = (payload: Object) => void

type DispatchActionType = {
  type: string,
  payload?: any,
  subkey?: string,
}

type Response = {
  data: any
}

declare var getFoo:() => Promise<Response>

export default class NetworkSagaWrap {
  apiCall: PayloadFunc
  updateKey: string
  storeKey: string
  data: Object
  resultSaga: ?Generator<void, void, void>

  UPDATE: string
  START: string
  FAILURE: string
  PENDING: string

  initialState: {data: Object, failure: ?string, successful: bool, pending: bool}

  constructor(apiCall: PayloadFunc, updateKey: string, storeKey: string, data: Object = {}, resultSaga: ?Generator<void, void, void> = null) {
    this.apiCall = apiCall
    this.updateKey = updateKey
    this.storeKey = storeKey

    this.resultSaga = resultSaga

    this.UPDATE = `${updateKey}/Update`
    this.START = `${updateKey}/Start`
    this.FAILURE = `${updateKey}/Failure`
    this.PENDING = `${updateKey}/Pending`

    this.initialState = {
      data,
      failure: null,
      successful: false,
      pending: false,
    }
  }

  static successPayloadGenerator(actionType: string, data: {data: {data: any}}, subkey?: string): DispatchActionType {
    return {
      type: actionType,
      payload: data.data,
      subkey,
    }
  }

  static errorPayloadGenerator(actionType: string, data: {error: string, form_errors?: {}}, subkey?: string): DispatchActionType {
    /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
    let error = data.error
    if (data.form_errors && Object.keys(data.form_errors).length) {
      error = data.form_errors[Object.keys(data.form_errors)[0]]
    }
    return {
      type: actionType,
      payload: error,
      subkey,
    }
  }

  * start(action: DispatchActionType): Generator<void, void, void> {
    // Dispatch this.START to mark the state as "pending"
    yield put(this.dispatch(action.payload))
    // Run the saga
    yield* this.saga(action)
  }

  * saga(action: DispatchActionType): Generator<any, any, any> {
    try {
      const payload = action.payload || []
      // Call the API
      const response: Response = (yield call(this.apiCall, payload) : Response)
      // Dispatch an "Update" event to mark as successful
      yield put(NetworkSagaWrap.successPayloadGenerator(this.UPDATE, response.data, action.subkey))

      if (this.resultSaga && response) {
        // $FlowFixMe
        yield fork(this.resultSaga.bind(this), action, (response.data && response.data.data) || response.data)
      }
    } catch (error) {
      try {
        console.log(error.response)
        if (error.response.status === 401) {
          yield put({ type: 'AuthState/RESET_USER' })
        } else {
          yield put(NetworkSagaWrap.errorPayloadGenerator(this.FAILURE, error.response.data, action.subkey))
        }
      } catch (error2) {
        yield put(NetworkSagaWrap.errorPayloadGenerator(this.FAILURE, { error: 'API is not responding' }, action.subkey))
        console.log(error)
      }
    }
  }

  stateUpdate(state: string, action: DispatchActionType, storeKey: ?string = null) {
    // Take an optional storeKey param to easily reuse the saga
    const key = storeKey || this.storeKey
    switch (action.type) {
      case this.PENDING:
      case this.START:
        return update(state, {
          [key]: {
          // $FlowFixMe
            $set: update(state[key], {
              $merge: { pending: true },
            }),
          },
        })
      case this.UPDATE:
        return update(state, {
          [key]: {
            $set: update(this.initialState, {
              $merge: {
                data: action.payload,
                pending: false,
                successful: true,
              },
            }),
          },
        })
      case this.FAILURE:
        return update(state, {
          [key]: {
            $set: update(this.initialState, {
              $merge: { failure: action.payload, pending: false, successful: false },
            }),
          },
        })
      default:
        return state
    }
  }

  dispatch(payload: ?any, subkey?: string): DispatchActionType {
    return {
      type: this.START,
      payload,
      subkey,
    }
  }

  dispatchPending(subkey?: string): DispatchActionType {
    return {
      type: this.PENDING,
      subkey,
    }
  }
}
