// @flow
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import { storiesOf } from '@storybook/react-native'

import { buildContacts } from '../../../src/helpers/contacts'
import { NonUADDContactsTwoAddressBooks, UADDContactShane, NonUADDEjectedContact } from '../../../__mocks__/contacts'
import { DebugContactsScreen } from '../../../src/screens/DebugContacts'

storiesOf('Screens/Debug/Debug Contacts', module)
  .add(
    'with basic layout',
    () => {
      const contactsHash = buildContacts([...NonUADDContactsTwoAddressBooks, NonUADDEjectedContact], [UADDContactShane])
      const contacts = Object.keys(contactsHash).map(key => contactsHash[key])
      return (
        <DebugContactsScreen
          contacts={contacts}
          hasHydratedContacts
          loadDebugContacts={() => {}}
        />
      )
    },
    {
      info: {
        text: 'Baggage Page',
      },
    },
  )
