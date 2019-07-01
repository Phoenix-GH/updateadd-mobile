// @flow

import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native'
import Path from '../../images/Path.png'

import {
  itemStyle,
  linkStyle,
  chevronStyle,
  labelStyle,
  fullLabelStyle,
} from './styles'

type ItemProps = {|
  text?: string,
  onOpen: () => void,
|}

const LinkItem = (props: ItemProps) => {
  const {
    text,
    onOpen,
  } = props
  return (
    <View style={itemStyle}>
      <TouchableOpacity
        onPress={onOpen}
        style={{width: '100%'}}
      >
        <View style={linkStyle}>
          <Text style={fullLabelStyle}>{text}</Text>
          <Image
            style={chevronStyle}
            source={Path}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}

LinkItem.defaultProps = {
  text: null,
}

export default LinkItem
