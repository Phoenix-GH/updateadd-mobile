// @flow

import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

/* eslint-disable */
class HelloWorldScreen extends React.Component<any> {
  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>
          Hello World
        </Text>
      </View>
    )
  }
}
/* eslint-enable */

export default connect(() : Object => ({}))(HelloWorldScreen)
