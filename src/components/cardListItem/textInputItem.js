// @flow

import React from 'react'
import { Text, View, TextInput } from 'react-native'

import {
  itemStyle,
  inputStyle,
  labelStyle,
} from './styles'

type ItemProps = {|
  text?: string,
  label?: string,
  placeholder?: string,
  onChangeText: (string) => void,
|}

const TextInputItem = (props: ItemProps) => {
  const {
    text,
    label,
    placeholder,
    onChangeText,
  } = props
  return (
    <View style={itemStyle}>
      {
        !!label && <Text style={labelStyle}>{label}</Text>
      }
      <TextInput
        style={inputStyle}
        onChangeText={content => onChangeText(content)}
        value={text}
        placeholder={placeholder}
      />
    </View>
  )
}

TextInputItem.defaultProps = {
  placeholder: '',
  text: null,
  label: null,
}

export default TextInputItem
