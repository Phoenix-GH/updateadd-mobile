// @flow

import React from 'react'
import { View } from 'react-native'

type Props = {
  children?: React$Node,
  style?: Object,
}

export default function CenterView({ children, style }: Props) {
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
    >
      {children}
    </View>
  )
}

CenterView.defaultProps = {
  children: null,
  style: {},
}
