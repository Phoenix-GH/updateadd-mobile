// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { NavigationScreenProps, NavigationDispatch } from 'react-navigation'

import Anchor from '../../components/anchor'
import LoginForm from '../../components/forms/login'

import { Strings, Roots } from '../../constants'

import { authDispatchers } from '../../store/user'
import selectors from '../../selectors'

import styles from '../styles'

type StateToPropType = {|
  error: ?ErrorResponseType,
|}

type DispatchToPropType = {|
  loginUser: (payload: UserLoginPayload) => void,
  setLoginError: (error: ?ErrorResponseType) => void,
|}

type LoginScreenProps = {|
  ...StateToPropType,
  ...DispatchToPropType,
|} & NavigationScreenProps

export class LoginScreen extends React.Component<LoginScreenProps> {
  goToForgotPassword = () => {
    // TODO: UADD-87
    console.log('Forgot Password')
  }

  goToSignUp = () => {
    const { navigation } = this.props
    navigation.navigate(Roots.SignUp)
  }

  render() {
    const {
      error, navigation, loginUser, setLoginError,
    } = this.props

    return (
      <View style={styles.screenWrapper}>
        <Text style={styles.screenTitle}>{Strings.login}</Text>
        <LoginForm
          navigation={navigation}
          loginUser={loginUser}
          setLoginError={setLoginError}
          error={error}
        />
        <Anchor label={Strings.forgotPassword} onPress={this.goToForgotPassword} />
        <View style={styles.fixToBottom}>
          <Anchor label={Strings.signUpPrompt} onPress={this.goToSignUp} />
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state: StoreState): StateToPropType => ({
  error: selectors.user.getLoginError(state),
})

const mapDispatchToProps = (dispatch: NavigationDispatch): DispatchToPropType => ({
  loginUser: payload => dispatch(authDispatchers.loginUser.dispatch(payload)),
  setLoginError: error => dispatch(authDispatchers.setLoginError.dispatch(error)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
