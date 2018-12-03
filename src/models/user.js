// @flow

import { BaseModel } from '.'

type UserDataType = {
  id?: string,
  email?: string,
}

export default class User extends BaseModel {
  email: string

  constructor(data?: UserDataType = {}) {
    super(data)
    if (data) {
      this.email = data.email || ''
    }
  }
}
