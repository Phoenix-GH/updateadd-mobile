// @flow

import React from 'react'
import {
  View,
  SafeAreaView,
  SectionList,
  Text,
  Image,
} from 'react-native'
import { connect } from 'react-redux'
import { css } from '@emotion/native'
import { Header } from 'react-native-elements'
import { NavigationScreenProps } from 'react-navigation'
import RadialGradient from 'react-native-radial-gradient'
import CustomModal from '../../components/modal'
import PhotoSelector from '../../components/photoSelector'
import HeaderButton from '../../components/buttons/headerButton'
import TextInputItem from '../../components/cardListItem/textInputItem'
import ListItem from '../../components/cardListItem/listItem'
import LinkItem from '../../components/cardListItem/linkItem'
import { Roots, Strings } from '../../constants'
import Colors from '../../theme/colors'
import account_circle from '../../images/account_circle.png'

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
  padding: 0 15px 0px 15px;
  margin: 24px 0 13px 0;
  width: 100%;
  background-color: white;
`
const listWrapperStyle = css`
  width: 100%;
  padding-horizontal: 15px;
`
const listSectionStyle = css`
  background-color: rgba(158, 158, 158, 0.85);
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  width: 100%;
  background-color: white;
`
const listItemStyle = css`
  height: 51px;
`
const separatorStyle = css`
  height: 1px;
  flex: 1;
  flex-direction: row;
  margin-right: 15px;
  background-color: #ebebeb;
`
const gradientWrapper = css`
  margin-vertical: 21px;
  width: 100%;
  height: 195.89px;
  background-color: transparent;
  border-radius: 10px;
  overflow: hidden; 
`
const gradientStyle = css`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  padding: 42.61px 47.14px 35.28px 33px;
  flex-direction: row;
  align-items: center;
`
const userInfoStyle = css`
  flex-direction: column;
  margin-left: 15.86px;
`
const footerAvatarStyle = css`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`
const footerUserNameStyle = css`
  font-family: 'Open Sans';
  font-size: 17.136px;
  line-height: 21px;
  letter-spacing: -0.612px;
  color: white;
`
const footerJobTitleStyle = css`
  font-family: 'Open Sans';
  font-size: 12.852px;
  line-height: 17px;
  text-transform: uppercase;
  letter-spacing: -0.612px;
  color: white;
`

type CreateCardScreenProps = NavigationScreenProps & {
}

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
          addAccounts: null,
        },
        contactInfo: {
          firstName: null,
          lastName: null,
          addEmail: null,
          phone: null,
          url: null,
          address: null,
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
      firstName: '',
      lastName: '',
      notes: '',
      companyName: '',
      jobTitle: '',
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
    this.setState({ [item]: text })
  }

  openSelect = (item: string) => {
    const { navigation } = this.props
    let mode = 'social'
    if (item === 'addEmail') {
      mode = 'email'
    } else if (item === 'phone') {
      mode = 'phone'
    } else if (item === 'address') {
      mode = 'address'
    }
    navigation.navigate(Roots.SelectModal, { mode })
  }

  renderSectionHeader = (title: string) => (
    <Text style={sectionHeaderStyle}>{Strings[title]}</Text>
  )

  renderSeparator = () => (
    <View style={separatorStyle} />
  )

  onCloseItem = (item: string) => {
    this.setState({ [item]: null })
  }

  renderItem = (item: {}) => {
    const { data } = this.state
    const items = Object.keys(data[item])
    const { placeholders } = Strings
    return (
      <View style={listWrapperStyle}>
        <View style={listSectionStyle}>
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
                      placeholder={placeholders[i]}
                    />
                    {
                      index < items.length - 1 && <View style={separatorStyle} />
                    }
                  </View>
                )
              }
              if (i === 'backgroundColor') {
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
                    onOpen={() => this.openSelect(i)}
                    onClose={() => this.onCloseItem(i)}
                    label={Strings[i]}
                    placeholder={placeholders[i]}
                  />
                  {
                    index < items.length - 1 && <View style={separatorStyle} />
                  }
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }

  renderListFooter = () => (
    <View style={listWrapperStyle}>
      <View style={gradientWrapper}>
        <RadialGradient
          style={gradientStyle}
          colors={[Colors.radialGradientStart, Colors.radialGradientCenter, Colors.radialGradientEnd]}
          stops={[0, 0, 1]}
          radius={195.89}
        >
          <Image source={account_circle} style={footerAvatarStyle} />
          <View style={userInfoStyle}>
            <Text style={footerUserNameStyle}>{Strings.userNamePlaceholder}</Text>
            <Text style={footerJobTitleStyle}>{Strings.jobPlaceholder}</Text>
          </View>
        </RadialGradient>
      </View>
    </View>
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
            renderItem={({ item }) => this.renderItem(item)}
            sections={sections}
            keyExtractor={(item, index) => item + index}
            style={listStyle}
            ListFooterComponent={() => this.renderListFooter()}
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default connect()(CreateCardScreen)
