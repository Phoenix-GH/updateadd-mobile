// @flow
/* eslint-disable import/no-extraneous-dependencies */

import 'loki/configure-react-native'
import { AppRegistry } from 'react-native'
import { getStorybookUI, configure } from '@storybook/react-native'

import './rn-addons'
import { loadStories } from './storyLoader'

// $FlowFixMe
console.disableYellowBox = true // eslint-disable-line no-console

// import stories
configure(() => {
  loadStories()
}, module)

// Refer to https://github.com/storybooks/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({ onDeviceUI: false })

// If you are using React Native vanilla write your app name here.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent('UpdateAdd', () => StorybookUIRoot)

export default StorybookUIRoot
