// @flow

import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

class HelloWorldScreen extends React.Component<any, any> {
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

export default connect(() : Object => ({}))(HelloWorldScreen)