// @flow

import React from 'react'
import { View, Text, TextInput } from 'react-native'

import styles from './styles'

type FieldProps = {|
  label: string,
  error: ?boolean,
  errorText: ?string,
|}

const Field = (props: FieldProps) => {
  const { label, error, errorText } = props
  return (
    <View style={styles.textInputRow}>
      <Text style={styles.textInputLabel}>{label}</Text>
      <TextInput {...props} style={{ ...styles.textInput, ...(error ? styles.textInputError : null) }} />
      {error && <Text style={styles.textInputErrorText}>{errorText}</Text>}
    </View>
  )
}

export default Field
