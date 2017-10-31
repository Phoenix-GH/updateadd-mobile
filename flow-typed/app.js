// Define type aliases
type StandardAction = {| type: string; payload: any; error?: boolean; meta?: any |}
type GeneratorType = Generator<void, void, any>


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

type ErrorType = {
  message: string,
}

// Network
declare var __DEV__ : string;

// File types

// Components

// modules - Because flow contains about these modules and they are not flow-typed
declare module 'react-native-code-push' {
  declare module.exports : any;
}
declare module 'react-native' {
  declare module.exports : any;
}
declare module 'react-navigation' {
  declare module.exports : any;
}
declare module 'redux-saga' {
  declare module.exports : any;
}
declare module 'redux-saga/effects' {
  declare module.exports : any;
}
declare module 'react-redux' {
  declare module.exports : any;
}
declare module 'redux-thunk' {
  declare module.exports : any;
}
declare module 'react-test-renderer' {
  declare module.exports : any;
}
declare module 'redux-form' {
  declare module.exports : any;
}
declare module 'redux' {
  declare module.exports : any;
}
declare module 'remote-redux-devtools' {
  declare module.exports : any;
}
declare module 'react-native-modalbox' {
  declare module.exports : any;
}
declare module 'immutability-helper' {
  declare module.exports : any;
}
declare module 'axios' {
  declare module.exports : any;
}
declare module 'bluebird' {
  declare module.exports : any;
}
declare module 'react-native-config' {
  declare module.exports : any;
}
declare module 'lodash' {
  declare module.exports : any;
}

// File types
