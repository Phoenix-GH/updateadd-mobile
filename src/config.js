// @flow

// import DeviceInfo from 'react-native-device-info'

const debug: ConfigType = {
  sentry: null,
  apiURL: 'http://127.0.0.1:8000/api/v1/',
  canWriteToAddressBook: false, // DeviceInfo.isEmulator(),
}

const staging: ConfigType = {
  sentry: null,
  apiURL: 'http://127.0.0.1:8000/api/v1/',
  canWriteToAddressBook: false,
}

const production: ConfigType = {
  sentry: null,
  apiURL: 'https://127.0.0.1:8000/api/v1/',
  canWriteToAddressBook: false,
}

const configs = {
  debug,
  staging,
  production,
}

const environment = configs[process.env.NODE_ENV || 'debug']

if (!environment) {
  /* eslint-disable */
  console.warn('No config file found.  Defaulting to debug')
  /* eslint-enable */
}

const config: ConfigType = environment || debug

export default config
