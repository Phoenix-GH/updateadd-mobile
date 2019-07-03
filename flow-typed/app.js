import type { NavigationScreenProp } from 'react-navigation'
import {
  DeviceContact,
  UpdateAddContact,
} from '../src/models'

// Define type aliases
type StandardAction = {| type: string; payload: any; error?: boolean; meta?: any |}

type NavigationPropType = {
  navigation: NavigationScreenProp,
}

type ConfigType = {|
  sentry: ?{ url: string },
  apiURL: string,
  canWriteToAddressBook: boolean,
|}

// Store States
type NavStoreState = Object

type UserType = {
  name: string
}

export type UserStoreState = {|
  user: ?UserType,
  pending: boolean,
  error: ?ErrorType,
|}

export type SystemContactsSyncStatus = 'IDLE' | 'READING' | 'ERROR'

export type ContactStoreState = {|
  contacts: ?Array<UpdateAddContact>,
  systemContacts: ?Array<SystemContactType>,
  systemContactsStatus: SystemContactsSyncStatus,
  cloudContacts: ?Array<UpdateAddContact>,
|}

type StoreState = {|
  user: UserStoreState,
  nav: NavStoreState,
  contacts: ContactStoreState,
|}

// API Payloads
type UserSignUpPayload = {|
  email: string,
  password: string,
  phone: string,
|}

type UserLoginPayload = {|
  email: string,
  password: string,
|}

// General Types
declare var __DEV__ : string;

type ErrorType = {
  message: string,
}

type SystemContactType = {|
  recordID: string,
  company: string,
  emailAddresses: Array<{|
    label: string,
    email: string,
  |}>,
  familyName: string,
  givenName: string,
  jobTitle: string,
  note: string, 
  urlAddresses: Array<{
    label: string,
    url: string,
  }>,
  middleName: string,
  phoneNumbers: Array<{|
    label: string,
    number: string,
  |}>,
  hasThumbnail: boolean,
  thumbnailPath: string,
  postalAddresses: Array<
    {|
      street: string,
      city: string,
      state: string,
      region: string,
      postCode: string,
      country: string,
      label: string
    |}
  >,
  birthday?: {|
    year?: number, 
    month: number, 
    day: number,
  |},
  uaddId?: string,  // TODO add to react-native-contacts library
|}

// modules - Because flow contains about these modules and they are not flow-typed
declare module 'react-native' {
  declare module.exports: any;
}
declare module 'react-redux' {
  declare module.exports: any;
}
declare module 'redux-saga/utils' {
  declare module.exports: any;
}
declare module 'redux-saga/effects' {
  declare module.exports : any;
}

// File types
