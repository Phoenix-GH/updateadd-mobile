// @flow
import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'
import CountryPicker from 'react-native-country-picker-modal'
import { SafeAreaView } from 'react-navigation'
import OnboardingCarousel from '../../components/OnboardingCarousel'
import gradient from '../../images/gradient.png'
/* eslint-disable */
/*flow-disable*/
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

const ModalView = styled(View)`
  position: absolute;
  top: -60;
  left: -60;
`

class Onboarding extends React.Component<any> {
  constructor(props) {
    super(props)
    this.state = {
      cca2: 'US',
      country: 'US',
      page: 0,
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

  render() {
    const { page } = this.state
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
          <ModalView>
            <CountryPicker
              ref={(picker) => {this.picker = picker;}}
              onChange={value => {
                this.setState({ cca2: value.cca2, country: value })
              }}
              cca2={this.state.cca2}
              translation="eng"
              closeable={true}
              style={listTheme}
            />
          </ModalView>
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

// $FlowFixMe
export default connect((): Object => ({}))(Onboarding)
