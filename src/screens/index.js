// @flow

/* eslint import/no-named-as-default: 0 */
import React from 'react'
import { connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'
import type { NavigationDispatch } from 'react-navigation'

import { addListener } from '../store'

import { Roots } from '../constants'

import HelloWorldScreen from './HelloWorld'

export const AppNavigator = StackNavigator({
  [Roots.HelloWorld]: {
    screen: HelloWorldScreen,
  },
})

const _RootContainer = (props : {
  dispatch: Function,
  nav: Object
}) => (<AppNavigator navigation={addNavigationHelpers({ dispatch: props.dispatch, state: props.nav, addListener })} />)

const mapStateToProps = (state : StoreState) => ({ nav: state.nav })

const mapStateToDispatch = (dispatch : NavigationDispatch) => ({ dispatch })

export const RootContainer = connect(mapStateToProps, mapStateToDispatch)(_RootContainer)

export default AppNavigator
