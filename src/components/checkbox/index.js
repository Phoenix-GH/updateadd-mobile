// @flow

import React from 'react'
import { View } from 'react-native'

import { CheckBox } from 'react-native-elements'
import Colors from '../../theme/colors'

import styles from './styles'

type FieldProps = {|
  error: boolean,
  title: string,
  checked: boolean,
  onPress: () => void,
|}

const CheckBoxField = (props: FieldProps) => {
  const { error, title, checked } = props

  const checkColor = error ? Colors.errorBackground : Colors.lightGrey
  const textStyles = {
    ...styles.checkboxText,
    color: error ? Colors.error : Colors.nearBlack,
  }


  return (
    <View style={styles.checkboxContainer}>
      <CheckBox
        checked={checked}
        size={18}
        uncheckedColor={checkColor}
        title={title}
        textStyle={textStyles}
        containerStyle={styles.checkbox}
        {...props}
      />
    </View>
  )
}

export default CheckBoxField
