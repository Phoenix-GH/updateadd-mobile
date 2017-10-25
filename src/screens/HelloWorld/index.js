// @flow

import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

export interface Props {}
export interface State {}

class HelloWorldScreen extends React.Component<Props, State> {
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
