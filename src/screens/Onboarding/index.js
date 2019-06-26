// @flow
import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'
import CountryPicker from 'react-native-country-picker-modal'
import { SafeAreaView } from 'react-navigation'
import OnboardingCarousel from '../../components/onboardingCarousel'
import gradient from '../../images/gradient.png'

const Container = styled(View)`
  padding: 20px;
  align-items: center;
  flex: 1;
`

const OnboardingButton = styled(TouchableOpacity)`
  margin: 0px 17px 20px 17px;
  border-radius: 4px;
  background-color: transparent;
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ButtonText = styled(Text)`
  color: white;
  font-size: 16px;
  line-height: 19px;
  font-family: Gotham;
`

const Gradient = styled(Image)`
  flex: 1;
  position: absolute;
`

const ModalButton = styled(View)`
  position: absolute;
  top: -60;
  left: -60;
`

const listTheme = StyleSheet.create({
  letterText: {
    color: 'blue',
  },
})

class Onboarding extends React.Component<any, any> {
  static navigationOptions = {
    header: null,
  }

  picker = null

  constructor(props) {
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

  render() {
    const { page, cca2 } = this.state

    let buttonTitle = 'Next'
    if (page === 3) {
      buttonTitle = 'Select Your country'
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container>
          <OnboardingCarousel
            activeIndex={page}
            setIndex={index => this.setState({ page: index })}
          />
          <OnboardingButton onPress={this.onPressNext}>
            <Gradient source={gradient} />
            <ButtonText>{buttonTitle}</ButtonText>
          </OnboardingButton>
          <ModalButton>
            <CountryPicker
              ref={(picker) => { this.picker = picker }}
              onChange={(value) => {
                this.setState({ cca2: value.cca2 })
                setTimeout(() => {
                  this.displayAlerts()
                }, 1000)
              }}
              cca2={cca2}
              translation="eng"
              closeable
              style={listTheme}
            />
          </ModalButton>
        </Container>
      </SafeAreaView>
    )
  }
}

export default connect((): Object => ({}))(Onboarding)
