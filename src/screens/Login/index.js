// @flow

import * as React from 'react'
import { View, Text } from 'react-native'

import Anchor from '../../components/anchor'
import LoginForm from '../../components/forms/login'

import { Strings, Roots } from '../../constants'

import styles from '../styles'

export default class LoginScreen extends React.Component<*> {
  goToForgotPassword = () => {
    // TODO: UADD-87
    console.log('Forgot Password')
  }

  goToSignUp = () => {
    const { navigation } = this.props
    navigation.navigate(Roots.SignUp)
  }

  render() {
    const { navigation } = this.props

    return (
      <View style={styles.screenWrapper}>
        <Text style={styles.screenTitle}>{Strings.login}</Text>
        <LoginForm navigation={navigation} />
        <Anchor label={Strings.forgotPassword} onPress={this.goToForgotPassword} />
        <View style={styles.fixToBottom}>
          <Anchor label={Strings.signUpPrompt} onPress={this.goToSignUp} />
        </View>
      </View>
    )
  }
}
