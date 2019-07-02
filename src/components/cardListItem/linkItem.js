// @flow

import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native'
import Path from '../../images/Path.png'
import ic_check from '../../images/ic_check.png'

import {
  itemStyle,
  linkStyle,
  chevronStyle,
  fullLabelStyle,
} from './styles'

type ItemProps = {|
  text?: string,
  isChecked?: boolean,
  checkItem?: boolean,
  onOpen: () => void,
|}

const LinkItem = (props: ItemProps) => {
  const {
    checkItem,
    isChecked,
    text,
    onOpen,
  } = props
  return (
    <View style={itemStyle}>
      <TouchableOpacity
        onPress={onOpen}
        style={{ width: '100%' }}
      >
        <View style={linkStyle}>
          <Text style={fullLabelStyle}>{text}</Text>
          {
            !checkItem
              ? (
                <Image
                  style={chevronStyle}
                  source={Path}
                  resizeMode="contain"
                />
              )
              : (
                isChecked
                  && (
                  <Image
                    style={chevronStyle}
                    source={ic_check}
                    resizeMode="contain"
                  />
                  )
              )
          }
        </View>
      </TouchableOpacity>
    </View>
  )
}

LinkItem.defaultProps = {
  text: null,
  isChecked: false,
  checkItem: false,
}

export default LinkItem
