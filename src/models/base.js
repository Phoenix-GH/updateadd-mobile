// @flow

export default class BaseModel {
  id: string

  constructor(data?: { id?: string } = {}) {
    if (data) {
      this.id = data.id || ''
    }
  }
}
