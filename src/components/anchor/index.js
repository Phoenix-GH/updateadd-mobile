// @flow

import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import styles from './styles'

type AnchorProps = {|
  label: string,
  onPress: () => void,
|}

const Anchor = (props: AnchorProps) => {
  const { label, onPress } = props
  return (
    <TouchableOpacity style={styles.anchor} onPress={onPress}>
      <Text style={styles.anchorText}>{label}</Text>
    </TouchableOpacity>
  )
}

export default Anchor
