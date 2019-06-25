// @flow

import { buildContacts } from '../../src/helpers/contacts'
import {
  NonUADDContactsOneAddressBook,
  NonUADDContactsTwoAddressBooks,
  NonUAddContactShane,
  NonUAddContactShane2,
  UADDContactShane,
  NonUADDEjectedContact,
} from '../../__mocks__/contacts'

const onlyUnique = (value, index, self) => self.indexOf(value) === index

describe('contacts', () => {
  describe('hydrating', () => {
    describe('non-UADD Contacts', () => {
      const contactsHash = buildContacts(NonUADDContactsTwoAddressBooks, [])
      const contacts = Object.keys(contactsHash).map(key => contactsHash[key])
      const names = contacts.map(contact => contact.contact.data.givenName)
      describe('generating UADDIDs for new contacts', () => {
        contacts.forEach((contact) => {
          it('should be defined', () => {
            expect(contact.syncID()).toBeDefined()
          })
        })
      })
      it('should have unique UADDIDs', () => {
        const uaddIds = contacts.map(contact => contact.syncID())
        const uniqueIds = uaddIds.filter(onlyUnique)
        expect(uaddIds).toHaveLength(uniqueIds.length)
      })
      it('should all be marked as needing to sync', () => {
        const needsToSyncCount = contacts.filter(contact => contact.needsSyncToCloud)
        expect(needsToSyncCount).toHaveLength(contacts.length)
      })
      it('should have Shane', () => {
        expect(names).toContain('Shane')
      })
      it('should have Shane', () => {
        expect(names).toContain('Juno')
      })
    })

    describe('new contact from UADD', () => {
      const contactsHash = buildContacts([], [UADDContactShane])
      const contacts = Object.keys(contactsHash).map(key => contactsHash[key])
      const names = contacts.map(contact => contact.contact.data.givenName)
      it('should be hydrated', () => {
        expect(contacts).toHaveLength(1)
      })
      it('should be set as needs syncing', () => {
        expect(contacts[0].needsToSyncToDevice()).toBeTruthy()
      })
      it('should have Shane', () => {
        expect(names).toContain('Shane')
      })
    })

    describe('finding same contact on system and in UADD', () => {
      const contactsHash = buildContacts([NonUAddContactShane], [UADDContactShane])
      const contacts = Object.keys(contactsHash).map(key => contactsHash[key])
      const names = contacts.map(contact => contact.contact.data.givenName)
      it('should only be one contact', () => {
        expect(contacts).toHaveLength(1)
      })
      it('should be not be marked for syncing', () => {
        expect(contacts[0].needsToSyncToDevice()).toBeFalsy()
      })
      it('should only have the associated contact', () => {
        expect(contacts[0].associatedContacts).toHaveLength(1)
      })
      it('should have Shane', () => {
        expect(names).toContain('Shane')
      })
    })

    describe('Device merged 2 contacts on address book, booting on a new device', () => {
      const contactsHash = buildContacts([NonUAddContactShane, NonUAddContactShane2], [UADDContactShane])
      const contacts = Object.keys(contactsHash).map(key => contactsHash[key])
      it('should have 2 contacts', () => {
        expect(contacts).toHaveLength(1)
      })
      it('should be not be marked for syncing', () => {
        expect(contacts[0].needsToSyncToDevice()).toBeFalsy()
      })
      it('should have the associated contacts', () => {
        expect(contacts[0].associatedContacts).toHaveLength(2)
      })
    })

    /*
      [complex] operations have more contacts, rather than happy path
    */

    describe('[complex] finding same contact on system and in UADD', () => {
      const contactsHash = buildContacts(NonUADDContactsOneAddressBook, [UADDContactShane])
      const contacts = Object.keys(contactsHash).map(key => contactsHash[key])
      const shane = contacts[0]
      it('should have 2 contacts', () => {
        expect(contacts).toHaveLength(2)
      })
      it('should be not be marked for syncing', () => {
        expect(shane.needsToSyncToDevice()).toBeFalsy()
      })
      it('should only have the associated contact', () => {
        expect(shane.associatedContacts).toHaveLength(1)
      })
    })

    describe('[complex] Device merged 2 contacts on address book, booting on a new device and an ejected contact', () => {
      const contactsHash = buildContacts([...NonUADDContactsTwoAddressBooks, NonUADDEjectedContact], [UADDContactShane])
      const contacts = Object.keys(contactsHash).map(key => contactsHash[key])
      const shane = contacts[0]
      const names = contacts.map(contact => contact.contact.data.givenName)
      it('should only be one contact', () => {
        expect(contacts).toHaveLength(2)
      })
      it('should be not be marked for syncing', () => {
        expect(shane.needsToSyncToDevice()).toBeFalsy()
      })
      it('should associate both device contacts', () => {
        expect(shane.associatedContacts).toHaveLength(2)
      })
      it('should have Shane', () => {
        expect(names).toContain('Shane')
      })
      it('should have Shane', () => {
        expect(names).toContain('Juno')
      })
    })
  })
})
