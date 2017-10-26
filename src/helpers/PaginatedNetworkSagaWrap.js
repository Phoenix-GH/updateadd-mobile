import update from 'immutability-helper'
import { call, put, select } from 'redux-saga/effects'
import _ from 'lodash'

import NetworkSagaWrap from './NetworkSagaWrap'
import ApiService from '../services/api-service'

export default class PaginatedNetworkSagaWrap extends NetworkSagaWrap {
  constructor(apiCall, apiResponseType, updateKey, primaryStoreKey, storeKey, data = []) {
    super(apiCall, updateKey, storeKey, data)

    // Request the next page of results
    this.FETCH_NEXT = `${this.UPDATE}/FetchNext`
    // Successfully fetched the next page
    this.APPEND_PAGE = `${this.UPDATE}/AppendPage`
    // No more pages to load
    this.END_OF_RESULTS = `${this.UPDATE}/EndOfResults`

    // Access via store[primaryStoreKey][storeKey] if necessary
    this.primaryStoreKey = primaryStoreKey
    // Used to call generic ApiService get request
    this.apiResponseType = apiResponseType
    // Append additional state requirements
    this.initialState.endOfResults = null
    this.initialState.meta = null
    this.initialState.order = null
  }

  successPayloadGenerator(actionType, data, subkey) {
    return _.extend(super.successPayloadGenerator(actionType, data), {
      meta: data.meta,
      subkey,
    })
  }

  // Paginate!
  getNext(payload, subkey) {
    return {
      type: this.FETCH_NEXT,
      payload,
      subkey,
    }
  }

  // Will be triggered on FETCH_NEXT
  * next(action) {
    // Get meta from store
    const selectMeta = (state) => {
      let store = state[this.primaryStoreKey]
      if (!store) {
        store = state.get(this.primaryStoreKey)
      }
      /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
      const subkey = action.subkey
      if (subkey) {
        return store[this.storeKey][subkey].meta
      }
      return store[this.storeKey].meta
    }
    const meta = yield select(selectMeta.bind(this))
    // Check if next page exists
    if (!meta || !meta.next) {
      yield put({ type: this.END_OF_RESULTS })
      return
    }
    // Next api url to fetch
    const nextApiUrl = meta.next
    try {
      const payload = action.payload || []
      // Call the API
      const response = yield call(ApiService.getNextPage, nextApiUrl, this.apiResponseType)
      // Dispatch a successful "APPEND_PAGE" event to merge data and meta
      yield put(this.successPayloadGenerator(this.APPEND_PAGE, response.data, action.subkey))
    } catch (error) {
      try {
        // Dispatch a "Failure"
        yield put(this.errorPayloadGenerator(this.FAILURE, error.response.data, action.subkey))
      } catch (error2) {
        console.log(error)
        throw error
      }
    }
  }

  // Paginated reducer
  stateUpdate(state, action) {
    let updateObject = null
    // Handle the pagination specific action types
    switch (action.type) {
      // Start loading next page
      case this.FETCH_NEXT:
        if (action.subkey) {
          updateObject = update(this.initialState, {
            $merge: {
              meta: state[this.storeKey][action.subkey].meta,
              pending: true,
              failure: null,
              successful: null,
            },
          })
        } else {
          updateObject = {
            $merge: {
              pending: true,
              failure: null,
              successful: null,
            },
          }
        }
        break

      // Append paginated results to store via $push
      case this.APPEND_PAGE:
        if (action.subkey) {
          updateObject = update(this.initialState, {
            $merge: {
              pending: false,
              failure: null,
              successful: true,
              meta: action.meta,
              endOfResults: (action.meta.next == null),
              order: (action.order || ''),
            },
            data: {
              $push: action.payload,
            },
          })
        } else {
          updateObject = {
            $merge: {
              pending: false,
              failure: null,
              successful: true,
              meta: action.meta,
              endOfResults: (action.meta.next == null),
              order: (action.order || ''),
            },
            data: {
              $push: action.payload,
            },
          }
        }
        break

      // Reached the last page of results
      case this.END_OF_RESULTS:
        if (action.subkey) {
          updateObject = update(this.initialState, {
            $merge: {
              pending: false,
              endOfResults: true,
            },
          })
        } else {
          updateObject = {
            $merge: {
              pending: false,
              endOfResults: true,
            },
          }
        }
        break

      // Override base UPDATE to add metadata
      case this.UPDATE:
        if (action.subkey) {
          return update(state, {
            [this.storeKey]: {
              $merge: {
                [action.subkey]: update(this.initialState, {
                  $merge: {
                    data: action.payload,
                    meta: action.meta,
                    pending: false,
                    successful: true,
                    endOfResults: (!!action.meta && action.meta.next == null),
                    order: (action.order || null),
                  },
                }),
              },
            },
          })
        }
        return update(state, {
          [this.storeKey]: {
            $set: update(this.initialState, {
              $merge: {
                data: action.payload,
                meta: action.meta,
                pending: false,
                successful: true,
                endOfResults: (!!action.meta && action.meta.next == null),
                order: (action.order || null),
              },
            }),
          },
        })

      case this.START: {
        if (action.subkey) {
          const superStart = super.stateUpdate(state, action)
          return update(superStart, {
            [this.storeKey]: {
              $merge: {
                [action.subkey]: update(this.initialState, {
                  $merge: {
                    pending: true,
                    order: (action.order || null),
                  },
                }),
              },
            },
          })
        }
        const superStart = super.stateUpdate(state, action)
        return update(superStart, {
          [this.storeKey]: {
            $merge: {
              pending: true,
              order: (action.order || null),
            },
          },
        })
      }

      default: break
    }

    if (updateObject) {
      if (action.subkey) {
        return update(state, {
          [this.storeKey]: {
            $merge: {
              [action.subkey]: updateObject,
            },
          },
        })
      }

      return update(state, {
        [this.storeKey]: {
          $set: update(state[this.storeKey], updateObject),
        },
      })
    }

    // Base reducer for START, UPDATE, FAILURE action types
    return super.stateUpdate(state, action)
  }
}
