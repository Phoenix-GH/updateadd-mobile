// @flow

import React from 'react'
import {
  View,
  SafeAreaView,
  SectionList,
} from 'react-native'
import { css } from '@emotion/native'
import { Header } from 'react-native-elements'
import { NavigationScreenProps } from 'react-navigation'
import HeaderButton from '../../components/buttons/headerButton'
import TextInputItem from '../../components/cardListItem/textInputItem'
import LinkItem from '../../components/cardListItem/linkItem'
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

const listStyle = css`
  width: 100%;
`

const sectionHeaderStyle = css`
  background-color: white;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.12);
  width: 100%;
  height: 1px;
`

const listWrapperStyle = css`
  background-color: rgba(158, 158, 158, 0.85);
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  width: 100%;
  background-color: white;
  border-bottom: none;
  border-top: none;
  padding-horizontal: 15px;
`

const listItemStyle = css`
  height: 51px;
`

const separatorStyle = css`
  height: 10px;
  flex: 1;
  flex-direction: row;
  margin-right: 15px;
  background-color: #ebebeb;
`

type ScreenModalProps = NavigationScreenProps & {|
  items: [],
|}

type ScreenModalState = {|
  customLabel: string,
|}

export class SelectModalScreen extends React.Component<ScreenModalProps, ScreenModalState> {
  static navigationOptions = { header: null }

  static defaultProps = {
    items: [],
  }

  constructor(props: ScreenModalProps) {
    super(props)
    this.state = {
      customLabel: '',
    }
  }

  onCancelPress = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  onDonePress = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  onChangeText = (text: string) => {
    this.setState({ customLabel: text })
  }

  renderSectionHeader = () => (
    <View style={sectionHeaderStyle} />
  )

  renderSeparator = () => (
    <View style={separatorStyle} />
  )

  renderItem = (item: {}) => {
    const { customLabel } = this.state
    return (
      <View style={listWrapperStyle}>
        {
          item === Strings.customLabel
            ? (
              <View style={listItemStyle}>
                <TextInputItem
                  text={customLabel}
                  onChangeText={text => this.onChangeText(text)}
                  label={Strings.customLabel}
                />
              </View>
            )
            : (
              <View style={listItemStyle}>
                <LinkItem
                  onOpen={() => this.onChangeText(item)}
                  text={item}
                />
              </View>
            )
        }
      </View>
    )
  }

  renderListFooter = () => (
    <View />
  )

  render() {
    const { items } = this.props
    const { customLabel } = Strings
    const sections = [
      { title: 'items', data: items },
      { title: 'Custom Label', data: [customLabel] },
    ]
    const {
      cancel,
      createCard,
      done,
    } = Strings
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={containerStyle}>
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
          <SectionList
            renderSectionHeader={() => this.renderSectionHeader()}
            renderItem={({ item }) => this.renderItem(item)}
            sections={sections}
            keyExtractor={(item, index) => item + index}
            style={listStyle}
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default SelectModalScreen
