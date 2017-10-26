// @flow

import React from 'react'
import { Platform, ProgressViewIOS, ProgressBarAndroid } from 'react-native'

type ProgressBarProps = {
  progress: ?number,
  color: ?string
}

class ProgressBar extends React.Component<ProgressBarProps> {
  static defaultProps = {
    progress: null,
    color: null,
  }

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

export default ProgressBar
