// @flow

import React from 'react'
import {
  View,
  SafeAreaView,
  SectionList,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import { css } from '@emotion/native'
import { Header } from 'react-native-elements'
import CustomModal from '../../components/modal'
import PhotoSelector from '../../components/photoSelector'
import HeaderButton from '../../components/buttons/headerButton'
import TextInputItem from '../../components/cardListItem/textInputItem'
import ListItem from '../../components/cardListItem/listItem'
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
  font-family: Gotham;
  font-size: 11px;
  line-height: 24px;
  letter-spacing: 0.2px;
  color: #272727;
  text-transform: uppercase;
  padding: 24px 15px 13px 15px;
  width: 100%;
  background-color: white;
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

type CreateCardScreenProps = {}

type CreateCardScreenState = {|
  isModalVisible: boolean,
  data: Object,
  firstName: string,
  lastName: string,
  notes: string,
  companyName: string,
  jobTitle: string,
|}

export class CreateCardScreen extends React.Component<CreateCardScreenProps, CreateCardScreenState> {
  static navigationOptions = { header: null }

  constructor(props: CreateCardScreenProps) {
    super(props)
    this.state = {
      isModalVisible: true,
      data: {
        social: {
          addAccounts: [],
        },
        contactInfo: {
          firstName: null,
          lastName: null,
          phoneNumbers: [],
        },
        company: {
          companyName: null,
          jobTitle: null,
        },
        notes: {
          notes: null,
        },
        cardAppearance: {
          backgroundColor: '',
        },
      },
      firstName: null,
      lastName: null,
      notes: null,
      companyName: null,
      jobTitle: null,
    }
  }

  onModalClose = () => {
    this.setState({ isModalVisible: false })
  }

  onCancelPress = () => {

  }

  onDonePress = () => {

  }

  onChangeText = (item: string, text: string) => {
    this.setState({ item: text })
  }

  renderSectionHeader = (title: string) => (
    <Text style={sectionHeaderStyle}>{Strings[title]}</Text>
  )

  renderSeparator = () => (
    <View style={separatorStyle} />
  )

  renderItem = (item: {}, index?: number, section?: number) => {
    const { data } = this.state
    const items = Object.keys(data[item])
    return (
      <View style={listWrapperStyle}>
        {
          items.map((i, index) => {
            if (i === 'firstName' || i === 'lastName' || i === 'companyName' || i === 'jobTitle' || i === 'notes') {
              const { state } = this

              return (
                <View key={i} style={listItemStyle}>
                  <TextInputItem
                    text={state[i]}
                    onChangeText={text => this.onChangeText(i, text)}
                    label={i === 'notes' ? '' : Strings[i]}
                    placeholder={Strings[i]}
                  />
                  {
                    index < items.length - 1 && <View style={separatorStyle} />
                  }
                </View>
              )
            } else if (i === 'backgroundColor') {
              return (
                <View key={i} style={listItemStyle}>
                  <LinkItem
                    onOpen={() => {}}
                    text={Strings.selectBackground}
                  />
                  {
                    index < items.length - 1 && <View style={separatorStyle} />
                  }
                </View>
              )
            }
            return (
              <View key={i} style={listItemStyle}>
                <ListItem
                  text={i}
                  onOpen={() => {}}
                  onClose={() => {}}
                  label={Strings[i]}
                  placeholder={Strings[i]}
                />
                {
                  index < items.length - 1 && <View style={separatorStyle} />
                }
              </View>
            )
          })
        }
      </View>
    )
  }

  renderListFooter = () => (
    <View />
  )

  render() {
    const { isModalVisible, data } = this.state
    const sections = Object.keys(data).map(section => (
      { title: section, data: [section] }
    ))
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
          <SectionList
            ListHeaderComponent={<PhotoSelector />}
            renderSectionHeader={({ section: { title } }) => this.renderSectionHeader(title)}
            renderItem={({ item, index, section }) => this.renderItem(item, index, section)}
            sections={sections}
            keyExtractor={(item, index) => item + index}
            style={listStyle}
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default connect()(CreateCardScreen)
