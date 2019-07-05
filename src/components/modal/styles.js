// @flow

import { css } from '@emotion/native'

const modalWrapper = css`
  background-color: rgba(158, 158, 158, 0.85);
  flex: 1;
  align-items: center;
  justify-content: center;
`

const modal = css`
  width: 90.4%;
  height: 33%;
  align-items: center;
  padding: 42px 32px;
  background-color: white;
  border-radius: 3px;
  `


const title = css`
  font-family: Gotham;
  font-size: 24px;
  letter-spacing: -0.5px;
  line-height: 32px;
  text-align: center;
  margin-bottom: 28px;
  color: #272727;
  max-width: 275px;
  font-weight: bold;
  `

export {
  modalWrapper,
  modal,
  title,
}
