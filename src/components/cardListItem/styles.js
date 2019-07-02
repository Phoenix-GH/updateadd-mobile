// @flow

import { css } from '@emotion/native'

const itemStyle = css`
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
`

const inputStyle = css`
  flex: 1;
`

const linkStyle = css`
  width: 100%;
  height: 100%;
  flex-direction: row;
  padding-horizotal: 21px;
  align-items: center;
`

const labelStyle = css`
  font-family: Gotham;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.5px;
  margin-right: 16px;
`

const openLabelStyle = css`
  font-family: Gotham;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: -0.357px;
  color: #001ee1;
`

const iconStyle = css`
  width: 20px;
  height: 20px;
  margin-right: 17px;
`

const arrowStyle = css`
  width: 5px;
  height: 10px;
  margin: 0 0px 0 20px;
`

const separatorStyle = css`
  height: 100%;
  width: 1px;
  background-color: #ebebeb;
  margin: 0 12px 0 9px;
`

const textStyle = css`
  font-family: Gotham;
  font-size: 14px;
  line-height: 20px;
  color: #001ee1;
`

const chevronStyle = css`
  width: 7.78px;
  height: 13.2px;
  margin: 0 16.22px 0 10px;
`

const fullLabelStyle = css`
  flex: 1;
  font-family: Gotham;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.5px;
`
export {
  itemStyle,
  inputStyle,
  linkStyle,
  iconStyle,
  labelStyle,
  arrowStyle,
  openLabelStyle,
  separatorStyle,
  textStyle,
  chevronStyle,
  fullLabelStyle,
}
