// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import {
  View, Text, Image, ScrollView, TouchableOpacity,
} from 'react-native'
import { NavigationScreenProps, NavigationDispatch } from 'react-navigation'

import Anchor from '../../components/anchor'
import SignUpForm from '../../components/forms/signup'

import { Strings, Images, Roots } from '../../constants'

import { authDispatchers } from '../../store/user'
import selectors from '../../selectors'

import styles from '../styles'

type StateToPropType = {|
  error: ?ErrorResponseType,
|}

type DispatchToPropType = {|
  signUpUser: (payload: UserSignUpPayload) => void,
  setSignUpError: (error: ?ErrorResponseType) => void,
|}

type SignUpScreenProps = {|
  ...StateToPropType,
  ...DispatchToPropType,
|} & NavigationScreenProps

export class SignUpScreen extends React.Component<SignUpScreenProps> {
  componentDidMount() {
    const { setSignUpError } = this.props
    setSignUpError(null)
  }

  backToLogin = () => {
    const { navigation } = this.props
    navigation.navigate(Roots.Login)
  }

  render() {
    const {
      error, navigation, signUpUser, setSignUpError,
    } = this.props

    return (
      <ScrollView alwaysBounceVertical={false}>
        <View style={styles.close}>
          <TouchableOpacity onPress={this.backToLogin}>
            <Image style={{ width: 24, height: 24 }} source={Images.close} />
          </TouchableOpacity>
        </View>
        <View style={styles.screenWrapper}>
          <Text style={styles.screenTitle}>{Strings.signUp}</Text>
          <SignUpForm
            navigation={navigation}
            signUpUser={signUpUser}
            error={error}
          />
          <Anchor label={Strings.loginPrompt} onPress={this.backToLogin} />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state: StoreState): StateToPropType => ({
  error: selectors.user.getSignUpError(state),
})

const mapDispatchToProps = (dispatch: NavigationDispatch): DispatchToPropType => ({
  signUpUser: payload => dispatch(authDispatchers.signUpUser.dispatch(payload)),
  setSignUpError: error => dispatch(authDispatchers.setSignUpError.dispatch(error)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
