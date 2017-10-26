// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Platform, ProgressViewIOS, ProgressBarAndroid } from 'react-native'

export interface Props {}
export interface State {}

class ProgressBar extends Component<Props, State> {
  render() {
    if (Platform.OS === 'ios') {
      return (
        <ProgressViewIOS
          {...this.props}
          progress={this.props.progress ? this.props.progress / 100 : 0.5}
          progressTintColor={this.props.color ? this.props.color : '#FFFFFF'}
          trackTintColor="rgba(255,255,255,0.5)"
        />
      )
    }
    return (
      <ProgressBarAndroid
        {...this.props}
        styleAttr="Horizontal"
        indeterminate={false}
        progress={this.props.progress ? this.props.progress / 100 : 0.5}
        color={this.props.color ? this.props.color : '#FFFFFF'}
      />
    )
  }
}

ProgressBar.propTypes = {
  progress: PropTypes.number,
  color: PropTypes.string,
}

ProgressBar.defaultProps = {
  progress: null,
  color: null,
}

export default ProgressBar
