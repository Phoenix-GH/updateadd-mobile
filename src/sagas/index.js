// @flow

import ContactSagas, * as contacts from './contacts'
import UserSagas, * as user from './user'

export const generators = [
  ContactSagas,
  UserSagas,
]

export default {
  contacts,
  user,
}
