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
import OnboardingCarousel from '../../components/OnboardingCarousel'
import gradient from '../../images/gradient.png'
/* eslint-disable */

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

const ButtonText= styled(Text)`
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

const ModalView = styled(View)`
  width: 277px;
  margin: 0 auto;
  background-color: #f8f8f8;
  border: 1px solid #979797;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ModalTitle = styled(Text)`
  font-size: 16px;
  color: #313131;
  margin: 20px auto;
  max-width: 208px;
  line-height: 19px;
  text-align: center;
`

const ModalText = styled(Text)`
  font-size: 14px;
  color: #313131;
  line-height: 16px;
  text-align: center;
  margin: 8px 23px 19px 24px;
  width: 230px;
`

const ModalSeparator = styled(View)`
  height: 1px;
  width: 100%;
  background-color: #0079ff;
`

const ModalVSeparator = styled(View)`
  height: 100%;
  width: 1px;
  background-color: #0079ff;
`

const ModalButtonRow = styled(View)`
  flex-direction: row;
  background-color: transparent;
`

const ModalButtonWrapper = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 40px;
`

const ModalButtonText = styled(Text)`
  color: #007aff;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
`

class Onboarding extends React.Component<any, any> {
  picker = null
  constructor(props) {
    super(props)
    this.state = {
      cca2: '',
      country: '',
      page: 0,
      modalState: 0,
    }
  }

  static navigationOptions = {
    header: null,
  } 

  onPressNext = () => {
    const { page } = this.state;
    if(page < 3) {
      this.setState({ page: page + 1 })
    } else {
      if(this.picker) {
        this.picker.setState({ modalVisible: true })
      }
    }
  }

  displayAlerts = () => {
    Alert.alert('Welcome!', 'UADD allows you to upadte, add, and manage your contacts. To use UADD, please allow access to your contacts.',
      [
        {text: 'Continue', onPress: () => {
          Alert.alert('"UADD" Would Like to Access Your Contacts',
            'UADD requires access to your contacts to update, add, and manage your contacts.', 
            [
              {text: 'Don\'t allow', onPress: () => {}, style: 'cancel'},
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
          )
        }},
      ]
    );
  }
    

  render() {
    const { page, modalState } = this.state
    
    let buttonTitle = 'Next'
    if(page === 3) {
      buttonTitle = 'Select Your country'
    }
   
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container>
          <OnboardingCarousel
            activeIndex={page}
            setIndex={(index) => this.setState({ page: index })}
          />
          <OnboardingButton onPress={this.onPressNext}>
            <Gradient source={gradient} />
            <ButtonText>{buttonTitle}</ButtonText>
          </OnboardingButton>
          <ModalButton>
            <CountryPicker
              ref={(picker) => {this.picker = picker;}}
              onChange={value => {
                this.setState({ cca2: value.cca2, country: value })
                setTimeout( () => {
                  this.displayAlerts()
                }, 1000)
              }}
              cca2={this.state.cca2}
              translation="eng"
              closeable={true}
              style={listTheme}
            />
          </ModalButton>
        </Container>
      </SafeAreaView>
    )
  }
}

const listTheme = StyleSheet.create({
  letterText: {
    color: 'blue',
  }
});
/* eslint-enable */


export default connect((): Object => ({}))(Onboarding)
