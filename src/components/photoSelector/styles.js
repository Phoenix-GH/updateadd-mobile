// @flow

import { css } from '@emotion/native'

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

const cameraImage = css`
  width: 38px;
  height: 38px;
  border-radius: 19px;
  position: absolute;
  right: -6.67px;
  top: -2.58px; 
`

export {
  photoSelector,
  image,
  cameraImage,
}
