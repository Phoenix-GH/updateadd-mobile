// @flow

import UserSagas, * as user from './user'

export const generators = [
  UserSagas,
]

export default {
  user,
}
