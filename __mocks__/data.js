// @flow

import { User } from '../src/models'

const user = new User({
  id: '1',
  email: 'shane@clearsumm.it',
  first_name: 'Shane',
  last_name: 'Zilinskas',
  phone: '+16155097447',
  country: 'US',
  language: 'EN',
  token: '',
  sort_by_family_name: true,
  first_name_first: true,
})

export default {
  user,
}
