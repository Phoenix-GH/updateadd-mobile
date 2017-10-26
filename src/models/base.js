// @flow

export default class BaseModel {
  id: string
  _hasHydrated: bool

  constructor(data: Object) {
    if (!this._hasHydrated) {
      // for (const key of data) {
      // const val = data[key]
      // if (!data._hasHydrated) {
      //   // $FlowFixMe
      //   if (this[key] !== undefined) {
      //     throw `Naming collision ${key}`
      //   }
      // }
      // // $FlowFixMe
      // this[key] = val
      // }
      this._hasHydrated = true
    }
  }
}
