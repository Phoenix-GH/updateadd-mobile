// @flow

import React from 'react'
import {
  View,
  StyleSheet,
  Alert,
} from 'react-native'
import { css } from '@emotion/native'
import CountryPicker from 'react-native-country-picker-modal'
import { SafeAreaView } from 'react-navigation'
import OnboardingCarousel from '../../components/onboardingCarousel'
import SubmitButton from '../../components/buttons/submit'

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
type CCA2Type = {|
  cca2: string,
|}

type OnboardingScreenProps = {}

type OnboardingScreenState = {|
  cca2: string,
  page: number,
|}

export default class OnboardingScreen extends React.Component<OnboardingScreenProps, OnboardingScreenState> {
  static navigationOptions = { header: null }

  picker: ?CountryPicker

  constructor(props: OnboardingScreenProps) {
    super(props)
    this.state = {
      cca2: '',
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
    Alert.alert('Welcome!', 'UADD allows you to upadte, add, and manage your contacts. To use UADD, please allow access to your contacts.',
      [
        {
          text: 'Continue',
          onPress: () => {
            Alert.alert('"UADD" Would Like to Access Your Contacts',
              'UADD requires access to your contacts to update, add, and manage your contacts.',
              [
                { text: 'Don\'t allow', onPress: () => {}, style: 'cancel' },
                { text: 'OK', onPress: () => {} },
              ])
          },
        },
      ])
  }

  onCountryPickerChange = (value: CCA2Type) => {
    this.setState({ cca2: value.cca2 })
    setTimeout(() => {
      this.displayAlerts()
    }, 1000)
  }

  render() {
    const { page, cca2 } = this.state

    let buttonTitle = 'Next'
    if (page === 3) {
      buttonTitle = 'Select Your country'
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
              cca2={cca2}
              translation="eng"
              closeable
              style={listTheme}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
