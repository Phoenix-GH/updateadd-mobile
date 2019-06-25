// @flow

import * as React from 'react'
import {
  View, Text, Image, ScrollView, TouchableOpacity,
} from 'react-native'

import Anchor from '../../components/anchor'
import SignUpForm from '../../components/forms/signup'

import { Strings, Images, Roots } from '../../constants'

import styles from '../styles'

export default class SignUpScreen extends React.Component<*> {
  handleLogin = () => {
    const { navigation } = this.props
    navigation.navigate(Roots.Login)
  }

  onSubmit = () => {
    const { navigation } = this.props
    navigation.navigate(Roots.DebugContacts)
  }

  render() {
    return (
      <ScrollView alwaysBounceVertical={false}>
        <View style={styles.close}>
          <TouchableOpacity onPress={this.handleLogin}>
            <Image style={{ width: 24, height: 24 }} source={Images.close} />
          </TouchableOpacity>
        </View>
        <View style={styles.screenWrapper}>
          <Text style={styles.screenTitle}>{Strings.signUp}</Text>
          <SignUpForm onSubmit={this.onSubmit} />
          <Anchor label={Strings.loginPrompt} onPress={this.handleLogin} />
        </View>
      </ScrollView>
    )
  }
}
