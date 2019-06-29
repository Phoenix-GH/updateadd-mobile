// @flow

import React from 'react'
import { Text, Modal, View } from 'react-native'
import SubmitButton from '../buttons/submit'

import {
  modalWrapper,
  title,
  modal,
} from './styles'

type ModalProps = {|
  text: string,
  buttonTitle: string,
  onClose?: () => void
|}

const CustomModal = (props: ModalProps) => {
  const { text, buttonTitle, onClose } = props
  return (
    <Modal
      {...props}
      transparent
    >
      <View style={modalWrapper}>
        <View style={modal}>
          <Text style={title}>{text}</Text>
          <SubmitButton
            label={buttonTitle}
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  )
}

CustomModal.defaultProps = {
  onClose: () => {},
}

export default CustomModal
