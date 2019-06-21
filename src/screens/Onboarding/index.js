// @flow

import React from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'
import logo from '../../images/logo.png'

/* eslint-disable */

const Container = styled(View)`
	padding: 20px;
	align-items: center;
`

const Title = styled(Text)`
	font-family: Gotham;
	font-size: 24px;
	line-height: 27px;
	text-align: center;
	text-transform: uppercase;
`

class Onboarding extends React.Component<any> {
	static navigationOptions = {
		header: null,
	}	

  render() {
    return (
      <Container>
      	<Image source={logo} />
      	<Text>
      		WELCOME TO UADD
      	</Text>
      	<Title>
      		Create & share personalized business cards with anyone.
      	</Title>
      	<Text>
      		Our technology pushes updates to anyone with your card.
      	</Text>
      </Container>
    )
  }
}
/* eslint-enable */

// $FlowFixMe
export default connect((): Object => ({}))(Onboarding)
