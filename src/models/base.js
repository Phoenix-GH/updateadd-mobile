// @flow

type BaseType = {
  id: ?string
}

export default class BaseModel {
  _id: string

  constructor(data?: BaseType = {
    id: null,
  }) {
    if (data) {
      this.id = data.id || ''
    }
  }

  set id(value: ?string) {
    this._id = value || ''
  }

  get id(): string {
    return this._id
  }
}
