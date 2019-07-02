// @flow

import React from 'react'
import { TouchableOpacity, Image, View } from 'react-native'
import account_circle from '../../images/account_circle.png'
import camera from '../../images/camera.png'

import {
  photoSelector,
  image,
  cameraImage,
} from './styles'

type ModalProps = {|
  onOpen?: () => void,
|}

const PhotoSelector = (props: ModalProps) => {
  const { onOpen } = props
  return (
    <View style={photoSelector}>
      <TouchableOpacity
        onPress={onOpen}
      >
        <Image source={account_circle} style={image} />
        <Image source={camera} style={cameraImage} />
      </TouchableOpacity>
    </View>
  )
}

PhotoSelector.defaultProps = {
  onOpen: () => {},
}

export default PhotoSelector
