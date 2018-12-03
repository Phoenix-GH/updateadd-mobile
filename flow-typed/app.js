// Define type aliases
type StandardAction = {| type: string; payload: any; error?: boolean; meta?: any |}

// Store States
type NavStoreState = Object

type UserType = {
  name: string
}

type UserStoreState = {
  user: ?UserType,
  pending: boolean,
}

type StoreState = {
  user: UserStoreState,
  nav: NavStoreState,
}

// General Types
declare var __DEV__ : string;

type ErrorType = {
  message: string,
}

// modules - Because flow contains about these modules and they are not flow-typed
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
