// @flow

import { BaseModel } from '.'

type UserDataType = {
  id: ?string,
  email: ?string,
}

export default class User extends BaseModel {
  _email: string

  constructor(data?: UserDataType = {
    id: null,
    email: null,
  }) {
    super(data)
    if (data) {
      this.email = data.email || ''
    }
  }

  set email(value: ?string) {
    this._email = value || ''
  }

  get email(): string {
    return this._email
  }
}
