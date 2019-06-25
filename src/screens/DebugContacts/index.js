// @flow

import * as React from 'react'
import {
  View, Text, ScrollView, Button,
} from 'react-native'
import { connect } from 'react-redux'
import { UADDContact } from '../../models'
import { dispatchers as contactDispatchers } from '../../store/contacts'
import selectors from '../../selectors'

import styles from '../styles'

type StateToPropType = {|
  hasHydratedContacts: boolean,
  contacts: Array<UADDContact>,
|}

type DispatchToPropType = {|
  loadDebugContacts: () => void,
|}

type PropType = {| ...StateToPropType, ...DispatchToPropType |}

export class DebugContactsScreen extends React.Component<PropType> {
  loadContacts = () => {
    const { loadDebugContacts } = this.props
    // Make address book
    loadDebugContacts()
  }

  renderDiff = (contact: DeviceContact) => {
    const diff = contact.diff()
    if (diff) {
      return Object.keys(diff).map<React.Node>((key: string) => (
        <Text key={key}>
          {key}
          {' '}
=
          {' '}
          {diff[key][0]}
          {' '}
->
          {' '}
          {diff[key][1]}
        </Text>
      ))
    }
    return null
  }

  renderContact(contact: UADDContact) {
    return (
      <View>
        <Text>
Name:
          {contact.contact.data.givenName}
          {' '}
          {contact.contact.data.familyName}
        </Text>
        <Text>
Needs Cloud Sync:
          {contact.needsSyncToCloud ? 'Y' : 'N'}
        </Text>
        <Text>
Needs Contact Sync:
          {contact.needsToSyncToDevice() ? 'Y' : 'N'}
        </Text>
        {contact.associatedContacts.map(c => this.renderDiff(c))}
        <View style={{
          marginBottom: 10,
        }}
        />
      </View>
    )
  }

  renderContacts() {
    const { contacts, hasHydratedContacts } = this.props
    if (hasHydratedContacts) {
      return contacts.map<React.Node>((contact: UADDContact) => this.renderContact(contact))
    }
    return <Text>Pending...</Text>
  }

  render() {
    return (
      <View style={styles.screenWrapper}>
        <ScrollView style={{ paddingTop: 65 }}>
          <Button
            onPress={this.loadContacts}
            title="[DANGER] REPLACE ALL YOUR CONTACTS"
          />
          {this.renderContacts()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (store: StoreState): StateToPropType => ({
  hasHydratedContacts: selectors.contacts.hasHydratedContacts(store),
  contacts: selectors.contacts.getContacts(store),
})

const mapDispatchToProps = (dispatch: Function): DispatchToPropType => ({
  loadDebugContacts: () => dispatch(contactDispatchers.loadDebugContacts.dispatch(null)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DebugContactsScreen)
