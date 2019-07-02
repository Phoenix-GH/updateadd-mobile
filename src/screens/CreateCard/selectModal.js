// @flow

import React from 'react'
import {
  View,
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
  flex: 1;
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
  height: 51px;
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
  mode: string
|}

type ScreenModalState = {|
  customLabel: string,
|}

export class SelectModalScreen extends React.Component<ScreenModalProps, ScreenModalState> {
  static navigationOptions = { header: null }

  static defaultProps = {
    mode: 'social',
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

  renderItem = (item: string) => {
    const { customLabel } = this.state
    const { labels } = Strings
    return (
      <View style={listWrapperStyle}>
        <View style={listItemStyle}>
        {
          item === labels.customLabel
            ? (
              <TextInputItem
                text={customLabel}
                onChangeText={text => this.onChangeText(text)}
                label={Strings.labels.customLabel}
              />
            )
            : (
              <LinkItem
                onOpen={() => this.onChangeText(item)}
                text={item}
              />
            )
        }
        </View>
      </View>
    )
  }

  renderListFooter = () => (
    <View />
  )

  render() {
    const {navigation: {state: {params: { mode }}}} = this.props
    const data = Strings.labels[mode]
    const items = Object.values(data)
    const {labels: { customLabel }} = Strings

    const sections = [
      { title: 'items', data: items },
      { title: 'Custom Label', data: [customLabel] },
    ]
    const {
      cancel,
      done,
    } = Strings

    return (
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
          centerComponent={{ text: mode, style: headerTextStyle }}
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
    )
  }
}

export default SelectModalScreen
