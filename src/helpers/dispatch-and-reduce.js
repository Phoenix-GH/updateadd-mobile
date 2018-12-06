// @flow

/*
  Makes building dispatch and reducer functions easy!

  Build like the following

   import { dispatchReducer, runReducers } from './dispatch_and_reducer'

   export const dispatchers = {
     firstName: dispatchReducer(C.TEST_ACTION, (state, firstName: string): StoreState => ({ ...state, first_name: firstName })),
   }

   export const reducer = (state: StoreState = { ...store }, action: StandardAction): StoreState => runReducers(state, actions, action)

   dispatchers.firstName.dispatch('Shane')  // success
   dispatchers.firstName.dispatch(false)    // flow error


   Next step would be to allow passing a key instead of a reducer, and have flow catch
   any incorrectly passed values
*/

interface DispatchResponse<StateType, PayloadType> {
  type: string,
  dispatch: (payload: PayloadType) => StandardAction,
  reducer: (state: StateType, value: PayloadType) => StateType,
}

export function dispatchReducer<StateType, PayloadType>(type: string, reducer: (state: StateType, value: PayloadType) => StateType): DispatchResponse<StateType, PayloadType> {
  return {
    type,
    reducer,
    dispatch: payload => ({ type, payload }),
  }
}

// State in should equal type of state out
export function runReducers(state: *, reducers: { [any]: DispatchResponse<*, *>}, action: StandardAction): * {
  let newState = { ...state }
  Object.keys(reducers).forEach((key) => {
    const val = reducers[key]
    if (val.type === action.type) {
      newState = val.reducer(newState, action.payload)
    }
  })
  return newState
}
