// @flow

import React from 'react'
import { Text, View } from 'react-native'

import {
  itemStyle,
} from './styles'

type ItemProps = {|
  text: string,
  buttonTitle: string,
  onClose?: () => void
|}

const CardListItem = (props: ItemProps) => {
  const { text } = props
  return (
    <View style={itemStyle}>
      
    </View>
  )
}

CardListItem.defaultProps = {
  onClose: () => {},
}

export default CardListItem
