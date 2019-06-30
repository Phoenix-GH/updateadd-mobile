// @flow

import {
  Dimensions,
} from 'react-native'
import { css } from '@emotion/native'

const { width } = Dimensions.get('window')
const photoSelector = css`
  background-color: #e2e2e2;
  width: 100%;
  height: 200px;
  align-items: center;
  justify-content: center;
`

const image = css`
  width: 116.67px;
  height: 115.83px;
`

export {
  photoSelector,
  image,
}
