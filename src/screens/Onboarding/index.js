// @flow

import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { OnboardingCarousel } from '../../components'

/* eslint-disable */

const Container = styled(View)`
	padding: 20px;
	align-items: center;
	flex: 1;
`

class Onboarding extends React.Component<any> {
	static navigationOptions = {
		header: null,
	}	

  render() {
    return (
      <Container>
      	<OnboardingCarousel />
      </Container>
    )
  }
}
/* eslint-enable */

// $FlowFixMe
export default connect((): Object => ({}))(Onboarding)
