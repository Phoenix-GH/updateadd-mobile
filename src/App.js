// @flow

import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import CodePush from 'react-native-code-push'

import SentryUtil from './utils'
import RootContainer from './screens'
import Store from './store'

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.ON_NEXT_SUSPEND,
}

// If environment is not dev setup Sentry and configure with CodePush
export class App extends React.Component <any> {
  store = Store.configureStore()

  componentWillMount() {
    // On app load
    if (!__DEV__) {
      SentryUtil.configure('')
      CodePush.getUpdateMetadata().then((update) => {
        if (update) {
          SentryUtil.setVersion(`codepush:${update.label}`)
        }
      })
      SentryUtil.setExtraContext(this.store)
    }
  }

  render() {
    return (
      <Provider store={this.store}>
        <RootContainer />
      </Provider>
    )
  }
}

const start = () => {
  AppRegistry.registerComponent('ReactNativeSeed', () => CodePush(codePushOptions)(App))
}

export default start
