// @flow

import React from 'react'
import { Text, View, TextInput } from 'react-native'

import {
  itemStyle,
  inputStyle,
} from './styles'

type ItemProps = {|
  text?: string,
  label?: string,
  placeholder?: string,
  onChangeText: (string) => void,
|}

const TextInputItem = (props: ItemProps) => {
  const { text, label, placeholder, onChangeText } = props
  return (
    <View style={itemStyle}>
      <Text>{label}</Text>
      <TextInput
        style={inputStyle}
        onChangeText={(text) => onChangeText(text)}
        value={text}
      />
    </View>
  )
}

TextInputItem.defaultProps = {
  placeholder: '',
  text: null,
  label: '',
}

export default TextInputItem
