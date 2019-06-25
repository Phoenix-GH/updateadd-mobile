// @flow

import _ from 'lodash'

import BaseModel from './base'
import User from './user'
import DeviceContact from './device-contact' // eslint-disable-line
import UADDContact from './updateadd-contact' // eslint-disable-line

export {
  BaseModel,
  User,
  DeviceContact,
  UADDContact,
}

export const ModelResponseTypes = {
  User: 'User',
  Undefined: 'Undefined',
}

export function modelMapper(modelType: string, object: Object) {
  let ModelClass
  switch (modelType) {
    case ModelResponseTypes.User:
      ModelClass = User
      break

    default: break
  }
  if (ModelClass) {
    const { data, meta } = object
    if (_.isArray(data)) {
      // $FlowFixMe
      const hydrated = data.length > 0 ? data.map(item => new ModelClass(item)) : []
      return {
        data: hydrated,
        meta,
      }
    }
    return {
      data: new ModelClass(data || object),
      meta: null,
    }
  }
  if (modelType !== ModelResponseTypes.Undefined) {
    // eslint-disable-next-line
    console.error('Response was read without a valid Response Type', object)
  }
  return object
}
