// @flow

import { UADDContact } from '../src/models'
import { generateUADDNamespace } from '../src/helpers/namespace'

const BasicInfo = {
  recordID: 'basic-id',
  company: '',
  emailAddresses: [{
    label: 'work',
    email: 'carl-jung@example.com',
  }],
  familyName: 'Jung',
  givenName: 'Carl',
  jobTitle: '',
  note: 'some text',
  urlAddresses: [{
    label: 'home',
    url: 'www.jung.com',
  }],
  middleName: '',
  phoneNumbers: [{
    label: 'mobile',
    number: '(555) 555-5555',
  }],
  hasThumbnail: true,
  thumbnailPath: 'content://com.android.contacts/display_photo/3',
  postalAddresses: [
    {
      street: '123 Fake Street',
      city: 'Sample City',
      state: 'CA',
      region: 'CA',
      postCode: '90210',
      country: 'USA',
      label: 'home',
    },
  ],
  birthday: {
    year: 1988,
    month: 0,
    day: 1,
  },
}

export const NonUAddContactShane: SystemContactType = {
  ...BasicInfo,
  recordID: 'device-1-id-1',
  givenName: 'Shane',
  familyName: 'Zilinskas',
  note: generateUADDNamespace('', {
    count: 1,
    uaddId: 'cloud-23',
    deviceId: 'device-1',
    deleted: false,
  }),
}

export const NonUAddContactShane2: SystemContactType = {
  ...BasicInfo,
  recordID: 'device-2-id-1',
  givenName: 'Shane',
  familyName: 'Zilinskas',
  note: generateUADDNamespace('', {
    count: 1,
    uaddId: 'cloud-23',
    deviceId: 'device-2',
    deleted: false,
  }),
}

export const NonUADDContactsJuno: SystemContactType = {
  ...BasicInfo,
  givenName: 'Juno',
  familyName: 'Sheridan',
  recordID: 'device-1-id-2',
}

export const NonUADDEjectedContact: SystemContactType = {
  ...BasicInfo,
  givenName: 'Deleted',
  familyName: 'Person',
  recordID: 'deleted-contact',
  note: generateUADDNamespace('', {
    count: 1,
    uaddId: 'ejected',
    deviceId: 'device-3',
    deleted: true,
  }),
}

export const NonUADDContactsOneAddressBook: Array<SystemContactType> = [
  NonUAddContactShane,
  NonUADDContactsJuno,
]

export const NonUADDContactsTwoAddressBooks: Array<SystemContactType> = [
  // Device 1
  NonUAddContactShane,
  NonUADDContactsJuno,

  // Device 2
  NonUAddContactShane2,
]

export const UADDContactShane = new UADDContact({
  id: '9',
  contact: {
    ...BasicInfo,
    givenName: 'Shane',
    familyName: 'Zilinskas',
    note: generateUADDNamespace('', {
      count: 1,
      uaddId: 'cloud-23',
      deviceId: 'device-1',
      deleted: false,
    }),
  },
})
