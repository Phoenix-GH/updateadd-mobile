// @flow

import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { createStackNavigator } from 'react-navigation'
import type { NavigationDispatch, NavigationState } from 'react-navigation'
import { createReduxContainer, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'

import { Roots } from '../constants'

import OnboardingScreen from './Onboarding'

import Login from './Login'
import SignUp from './SignUp'
import DebugContacts from './DebugContacts'
import CreateCard from './CreateCard'


export const AppNavigator = createStackNavigator({
  [Roots.Onboarding]: {
    screen: OnboardingScreen,
  },
  [Roots.Login]: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  [Roots.SignUp]: {
    screen: SignUp,
    navigationOptions: {
      header: null,
    },
  },
  [Roots.DebugContacts]: {
    screen: DebugContacts,
    navigationOptions: {
      header: null,
    },
  },
  [Roots.CreateCard]: {
    screen: CreateCard,
  },
});

export const navigationMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav)
const AppNavigatorWithNavigationState = createReduxContainer(AppNavigator, 'root')

type RootProps = {
  dispatch: Function,
  navigation: NavigationState,
}

const RootContainer = (props: RootProps) => {
  const { dispatch, navigation } = props
  return (
    <View style={{ flex: 1 }}>
      <AppNavigatorWithNavigationState
        state={navigation}
        dispatch={dispatch}
      />
    </View>
  )
}

const mapStateToProps = (state: StoreState) => ({ navigation: state.nav })

const mapStateToDispatch = (dispatch: NavigationDispatch) => ({ dispatch })


export default connect(mapStateToProps, mapStateToDispatch)(RootContainer)
