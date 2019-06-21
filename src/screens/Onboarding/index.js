// @flow

import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { OnboardingCarousel } from '../../components'

/* eslint-disable */

const Container = styled(View)`
	padding: 20px;
	align-items: center;
	flex: 1;
`

const OnboardingButton = styled(TouchableOpacity)`
  margin: 30px 17px 20px 17px;
  border-radius: 4px;
  background-color: blue;
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
`;

class Onboarding extends React.Component<any> {
  state = {
    page: 0,
  }

	static navigationOptions = {
		header: null,
	}	

  onPressNext = () => {
    const { page } = this.state;
    if(page <3) {
      this.setState({ page: page + 1 });
    }
  }

  render() {
    const { page } = this.state;
    let buttonTitle = 'Next';
    if(page === 3) {
      buttonTitle = 'Select Your country';
    }
    return (
      <Container>
      	<OnboardingCarousel
          activeIndex={page}
          setIndex={(index) => this.setState({ page: index })}
        />
        <OnboardingButton onPress={this.onPressNext}>
          <ButtonText>Next</ButtonText>
        </OnboardingButton>
      </Container>
    )
  }
}
/* eslint-enable */

// $FlowFixMe
export default connect((): Object => ({}))(Onboarding)
