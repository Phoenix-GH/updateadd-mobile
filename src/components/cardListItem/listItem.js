// @flow

import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native'

import add_circle from '../../images/add_circle.png'
import remove_circle from '../../images/remove_circle.png'
import arrow_right from '../../images/arrow_right.png'
import {
  itemStyle,
  linkStyle,
  iconStyle,
  labelStyle,
  openLabelStyle,
  separatorStyle,
  arrowStyle,
  buttonStyle,
  inputStyle,
} from './styles'

type ItemProps = {|
  text?: string,
  label?: string,
  placeholder?: string,
  isFilled?: boolean,
  onChangeText: (string) => void,
  onOpen: () => void,
  onClose: () => void,
|}

const ListItem = (props: ItemProps) => {
  const {
    text,
    label,
    placeholder,
    onOpen,
    isFilled,
    onClose,
    onChangeText,
  } = props
  return (
    <View style={itemStyle}>
      {
        !isFilled
          ? (
            <TouchableOpacity
              onPress={onOpen}
              style={buttonStyle}
            >
              <View style={linkStyle}>
                <Image
                  style={iconStyle}
                  source={add_circle}
                  resizeMode="contain"
                />
                <Text style={labelStyle}>{placeholder}</Text>
              </View>
            </TouchableOpacity>
          )
          : (
            <View style={linkStyle}>
              <TouchableOpacity
                onPress={onClose}
              >
                <Image
                  style={iconStyle}
                  source={remove_circle}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={openLabelStyle}>{label}</Text>
              <Image
                style={arrowStyle}
                source={arrow_right}
                resizeMode="contain"
              />
              <View style={separatorStyle} />
              <TextInput
                style={inputStyle}
                onChangeText={content => onChangeText(content)}
                value={text}
                placeholder={placeholder}
              />
            </View>
          )
      }
    </View>
  )
}

ListItem.defaultProps = {
  placeholder: '',
  text: undefined,
  label: '',
  isFilled: false,
}

export default ListItem
