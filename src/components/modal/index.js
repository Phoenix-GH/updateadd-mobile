// @flow

import React from 'react'
import { Text, Modal } from 'react-native'
import SubmitButton from '../buttons/submit'

import styles from './styles'

type ModalProps = {|
  text: string,
  buttonTitle: string,
|}

const CustomModal = (props: ModalProps) => {
  const { text, buttonTitle } = props
  return (
    <Modal {...props}>
      <Text style={styles.submitButtonText}>{text}</Text>
      <SubmitButton label={buttonTitle} />
    </Modal>
  )
}

export default CustomModal
