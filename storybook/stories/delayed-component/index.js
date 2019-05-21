// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

type DelayedComponentProps = {
  delay?: number,
  onDone?: () => void,
  children?: React$Node,
  style?: Object,
}

export default class DelayedComponent extends Component<DelayedComponentProps> {
  static defaultProps = {
    delay: 1000,
    onDone: undefined,
    children: null,
    style: { flex: 1 },
  }

  timer: TimeoutID

  componentDidMount() {
    const { delay, onDone } = this.props
    this.timer = setTimeout(() => {
      if (onDone) {
        onDone()
      }
    }, delay)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    const { children, style } = this.props
    return (
      <View style={style}>
        {children}
      </View>
    )
  }
}
