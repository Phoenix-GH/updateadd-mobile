// @flow

import React from 'react'
import { AppRegistry, NativeModules, Platform } from 'react-native'
import { Provider } from 'react-redux'
import codePush from 'react-native-code-push'
import SentryUtil from './utils'

import { RootContainer } from './screens/index'
import Store from './store'

export interface Props {
  version : string,
  buildEnv : string
}
export interface State {}

// If environment is not dev setup Sentry and configure with CodePush
export class App extends React.Component < Props,
State > {
  componentWillMount() {
    // On app load
    if (!__DEV__) {
      SentryUtil.configure('')
      codePush.getUpdateMetadata().then((update) => {
        if (update) {
          SentryUtil.setVersion(`codepush:${update.label}`)
        }
      })
      SentryUtil.setExtraContext(this.store)
      SentryUtil.setTagsContext('buddbuild_version', global.build_version)
    }
  }

  store = Store()

  render() {
    if (Platform.OS === 'ios') {
      global.buildVersion = this.props.version
      global.buildEnv = this.props.buildEnv
    } else {
      global.buildVersion = NativeModules.RNConfig.buddyBuildNumber
      global.buildEnv = NativeModules.RNConfig.buildEnv
    }

    return (
      <Provider store={this.store}>
        <RootContainer />
      </Provider>
    )
  }
}

const start = () => {
  AppRegistry.registerComponent('ReactNativeSeed', () => codePush(App))
}

export default start
