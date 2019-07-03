// @flow

import BaseModel from './base'

type UserDataType = {
  id: ?string,
  email: ?string,
  phone: ?string,
}

export default class User extends BaseModel {
  _email: string

  _phone: string

  constructor(data?: UserDataType = {
    id: null,
    email: null,
    phone: null,
  }) {
    super(data)
    if (data) {
      this.email = data.email || ''
      this.phone = data.phone || ''
    }
  }

  set email(value: ?string) {
    this._email = value || ''
  }

  get email(): string {
    return this._email
  }

  set phone(value: ?string) {
    this._phone = value || ''
  }

  get pehone(): string {
    return this._phone
  }
}
