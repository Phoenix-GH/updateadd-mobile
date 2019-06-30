// @flow

import React from 'react'
import {
  View,
  SafeAreaView,
} from 'react-native'
import { connect } from 'react-redux'
import { css } from '@emotion/native'
import { Header } from 'react-native-elements'
import CustomModal from '../../components/modal'
import HeaderButton from '../../components/buttons/headerButton'
import { Strings } from '../../constants'

const containerStyle = css`
  align-items: center;
  flex: 1;
`
const headerBarStyle = css`
  background-color: white;
`
const headerTextStyle = css`
  color: #272727;
  font-size: 14px;
  font-family: 'Gotham';
  text-transform: uppercase;
`
type CreateCardScreenProps = {}

type CreateCardScreenState = {|
  isModalVisible: boolean,
|}

export class CreateCardScreen extends React.Component<CreateCardScreenProps, CreateCardScreenState> {
  static navigationOptions = { header: null }

  constructor(props: CreateCardScreenProps) {
    super(props)
    this.state = {
      isModalVisible: true,
    }
  }

  onModalClose = () => {
    this.setState({ isModalVisible: false })
  }

  onCancelPress = () => {

  }

  onDonePress = () => {

  }

  render() {
    const { isModalVisible } = this.state
    const {
      createCardTitle,
      continueText,
      cancel,
      createCard,
      done,
    } = Strings
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={containerStyle}>
          {
            isModalVisible && (
              <CustomModal
                text={createCardTitle}
                buttonTitle={continueText}
                onClose={this.onModalClose}
              />
            )
          }
          <Header
            leftComponent={
              (
                <HeaderButton
                  label={cancel}
                  onPress={this.onCancelPress}
                />
              )
            }
            centerComponent={{ text: createCard, style: headerTextStyle }}
            rightComponent={
              (
                <HeaderButton
                  label={done}
                  onPress={this.onDonePress}
                />
                )
              }
            containerStyle={headerBarStyle}
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default connect()(CreateCardScreen)
