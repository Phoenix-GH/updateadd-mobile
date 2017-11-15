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
declare module 'react-navigation' {
  declare module.exports : any;
}
declare module 'redux-saga/effects' {
  declare module.exports : any;
}

// File types
