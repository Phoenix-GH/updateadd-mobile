// @flow

import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { css } from '@emotion/native'

type HeaderButtonProps = {|
  label: string,
  onPress?: () => void,
  disabled?: boolean,
|}

const headerButtonText = css`
  color: #001ee1;
  font-family: Gotham;
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.218182px;
`

const HeaderButton = (props: HeaderButtonProps) => {
  const { label, disabled } = props
  return (
    <TouchableOpacity {...props} disabled={disabled}>
      <Text style={headerButtonText}>{label}</Text>
    </TouchableOpacity>
  )
}

HeaderButton.defaultProps = {
  disabled: false,
  onPress: () => {},
}

export default HeaderButton
