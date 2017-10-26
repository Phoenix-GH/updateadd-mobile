// @flow

import React from 'react'
import { AppRegistry, NativeModules, Platform, StyleSheet, View, Text } from 'react-native'
import Modal from 'react-native-modalbox'
import { Provider } from 'react-redux'
import CodePush from 'react-native-code-push'

import SentryUtil from './utils'
import ProgressBar from './components/progress-bar'

import { RootContainer } from './screens/index'
import Store from './store'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
})

export interface Props {
  version : string,
  buildEnv : string
}
export interface State {
  showDownloadingModal : bool,
  showInstalling : bool,
  downloadProgress : number
}

// If environment is not dev setup Sentry and configure with CodePush
export class App extends React.Component < Props, State > {
  state = {
    showDownloadingModal: false,
    showInstalling: false,
    downloadProgress: 0,
  }

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
      SentryUtil.setTagsContext('buddbuild_version', global.build_version)
    }
  }

  componentDidMount() {
    CodePush.sync({
      updateDialog: true,
      installMode: CodePush.InstallMode.IMMEDIATE,
    }, (status) => {
      switch (status) {
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          this.setState({ showDownloadingModal: true })
          if (this._modal) {
            this._modal.open()
          }
          break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
          this.setState({ showInstalling: true })
          break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
          if (this._modal) {
            this._modal.close()
          }
          this.setState({ showDownloadingModal: false })
          break;
        default:
          break;
      }
    }, ({ receivedBytes, totalBytes }) => {
      this.setState({
        downloadProgress: (receivedBytes / totalBytes) * 100,
      })
    })
  }

  store = Store()
  _modal = null

  render() {
    if (Platform.OS === 'ios') {
      global.buildVersion = this.props.version
      global.buildEnv = this.props.buildEnv
    } else {
      global.buildVersion = NativeModules.RNConfig.buddyBuildNumber
      global.buildEnv = NativeModules.RNConfig.buildEnv
    }

    if (this.state.showDownloadingModal) {
      return (
        <View style={styles.container}>
          <Modal
            style={styles.modal}
            backdrop={false}
            ref={(c) => { this._modal = c }}
            swipeToClose={false}
          >
            <View style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              padding: 20,
              }}
            >
              {this.state.showInstalling
                ?
                  <Text style={{
                    color: '#5067FF',
                    textAlign: 'center',
                    marginBottom: 15,
                    fontSize: 15,
                  }}
                  >
                    Installing update...
                  </Text>
                :
                  <View style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  padding: 20,
                  }}
                  >
                    <Text style={{
                    color: '#5067FF',
                    textAlign: 'center',
                    marginBottom: 15,
                    fontSize: 15,
                    }}
                    >
                     Downloading update... {' '}
                      {`${parseInt(this.state.downloadProgress, 10)} %`}
                    </Text>
                    <ProgressBar color="#5067FF" progress={parseInt(this.state.downloadProgress, 10)} />
                  </View>
              }
            </View>
          </Modal>
        </View>
      )
    }

    return (
      <Provider store={this.store}>
        <RootContainer />
      </Provider>
    )
  }
}

const start = () => {
  AppRegistry.registerComponent('ReactNativeSeed', () => App)
}

export default start
