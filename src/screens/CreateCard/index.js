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

import SubmitButton from '../../components/buttons/submit'

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
type CreateCardScreenProps = {}

type CreateCardScreenState = {|
  cca2: string,
  page: number,
|}

export class CreateCardScreen extends React.Component<CreateCardScreenProps, CreateCardScreenState> {
  static navigationOptions = { header: null }

  picker: ?CountryPicker

  constructor(props: CreateCardScreenProps) {
    super(props)
    this.state = {
      cca2: '',
      page: 0,
    }
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
          <View style={modalButtonStyle}>
            
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default connect()(CreateCardScreen)
