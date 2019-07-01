// @flow

import React from 'react'
import {
  View,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native'
import { connect } from 'react-redux'
import { css } from '@emotion/native'
import CountryPicker from 'react-native-country-picker-modal'
import { NavigationScreenProps } from 'react-navigation'
import OnboardingCarousel from '../../components/onboardingCarousel'
import SubmitButton from '../../components/buttons/submit'
import { Roots, Strings } from '../../constants'

const listTheme = StyleSheet.create({
  letterText: {
    color: 'blue',
  },
})

const containerStyle = css`
  padding: 20px;
  align-items: center;
  flex: 1;
`
const modalButtonStyle = css`
  position: absolute;
  top: -60;
  left: -60;
`
type CountryCodeType = {|
  cca2: string,
|}


type OnboardingScreenProps = NavigationScreenProps & {
}

type OnboardingScreenState = {|
  countryCode: string,
  page: number,
|}

export class OnboardingScreen extends React.Component<OnboardingScreenProps, OnboardingScreenState> {
  static navigationOptions = { header: null }

  picker: ?CountryPicker

  constructor(props: OnboardingScreenProps) {
    super(props)
    this.state = {
      countryCode: '',
      page: 0,
    }
  }

  onPressNext = () => {
    const { page } = this.state
    if (page < 3) {
      this.setState({ page: page + 1 })
    } else if (this.picker) {
      this.picker.setState({ modalVisible: true })
    }
  }

  displayAlerts = () => {
    const {
      welcomeAlerts,
      contactAlerts,
      continueText,
      dontAllow,
      ok,
    } = Strings

    Alert.alert(welcomeAlerts.title, welcomeAlerts.text,
      [
        {
          text: continueText,
          onPress: () => {
            Alert.alert(contactAlerts.title, contactAlerts.text,
              [
                { text: dontAllow, onPress: () => {}, style: 'cancel' },
                { text: ok, onPress: () => this.moveToCreateCard() },
              ])
          },
        },
      ])
  }

  onCountryPickerChange = (value: CountryCodeType) => {
    this.setState({ countryCode: value.cca2 })
    setTimeout(() => {
      this.displayAlerts()
    }, 1000)
  }

  moveToCreateCard = () => {
    const { navigation } = this.props
    navigation.navigate(Roots.CreateCard)
  }

  render() {
    const { page, countryCode } = this.state
    const { onboardingButtonTitles, countryPickerTranslationLanguage } = Strings
    const [nextTitle, selectTile] = onboardingButtonTitles
    let buttonTitle = nextTitle
    if (page === 3) {
      buttonTitle = selectTile
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={containerStyle}>
          <OnboardingCarousel
            activeIndex={page}
            setIndex={index => this.setState({ page: index })}
          />
          <SubmitButton
            label={buttonTitle}
            onPress={this.onPressNext}
          />
          <View style={modalButtonStyle}>
            <CountryPicker
              ref={(picker) => { this.picker = picker }}
              onChange={this.onCountryPickerChange}
              cca2={countryCode}
              translation={countryPickerTranslationLanguage}
              closeable
              style={listTheme}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default connect()(OnboardingScreen)
