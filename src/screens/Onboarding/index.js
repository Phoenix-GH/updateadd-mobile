// @flow

import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { OnboardingCarousel } from '../../components'

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

class Onboarding extends React.Component<any> {
  state = {
    page: 0,
  }

	static navigationOptions = {
		header: null,
	}	

  onPressNext = () => {
    const { page } = this.state;
    if(page < 3) {
      this.setState({ page: page + 1 })
    }
  }

  render() {
    const { page } = this.state
    let buttonTitle = 'Next'
    if(page === 3) {
      buttonTitle = 'Select Your country'
    }
    return (
      <Container>
      	<OnboardingCarousel
          activeIndex={page}
          setIndex={(index) => this.setState({ page: index })}
        />
        <OnboardingButton onPress={this.onPressNext}>
          <Gradient source={gradient} />
          <ButtonText>{buttonTitle}</ButtonText>
        </OnboardingButton>
      </Container>
    )
  }
}
/* eslint-enable */

// $FlowFixMe
export default connect((): Object => ({}))(Onboarding)
