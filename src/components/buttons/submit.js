// @flow

import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import Colors from '../../theme/colors'

import styles from './styles'

type ButtonProps = {|
  label: string,
  disabled?: boolean,
|}

const SubmitButton = (props: ButtonProps) => {
  const { label, disabled } = props
  return (
    <TouchableOpacity {...props} style={styles.submitButton} disabled={disabled}>
      <LinearGradient style={styles.linearGradient} colors={[Colors.submitGradientStart, Colors.submitGradientEnd]}>
        <Text style={styles.submitButtonText}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

SubmitButton.defaultProps = {
  disabled: false,
}

export default SubmitButton
