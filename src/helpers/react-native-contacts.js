// @flow

import * as Contacts from 'react-native-contacts'
import _ from 'lodash'
import { DeviceContact } from '../models'
import config from '../config'

/*
  This class is a wrapper around react-native-contacts so we can add safety checks,
  and returns promises, instead of functions with callsbacks
*/

const callback = (resolve, reject) => (err, result) => {
  if (err) {
    reject(err)
  } else {
    resolve(result)
  }
}

// Fake address book
let ADDRESS_BOOK = []

const findAddressBookContactIndex = (deviceContact: DeviceContact) => ADDRESS_BOOK.findIndex((systemContact: SystemContactType) => deviceContact.recordID === systemContact.recordID)

class ContactsWrapper {
  static addContact(deviceContact: DeviceContact): any {
    return new Promise((resolve, reject) => {
      if (config.canWriteToAddressBook) {
        Contacts.addContact(deviceContact.toObject(), callback(resolve, reject))
      } else {
        // Write to debug address book
        ADDRESS_BOOK.push(deviceContact.toObject())
        resolve()
      }
    })
  }

  static getAll(): any {
    return new Promise((resolve, reject) => {
      if (config.canWriteToAddressBook) {
        Contacts.getAll(callback(resolve, reject))
      } else {
        resolve(_.cloneDeep(ADDRESS_BOOK))
      }
    })
  }

  static updateContact(deviceContact: DeviceContact): any {
    return new Promise((resolve, reject) => {
      if (config.canWriteToAddressBook) {
        Contacts.updateContact(deviceContact.toObject(), callback(resolve, reject))
      } else {
        // Write to debug address book
        const contactIndex = findAddressBookContactIndex(deviceContact)
        ADDRESS_BOOK = [...ADDRESS_BOOK.splice(contactIndex, 1, deviceContact.toObject()), ...ADDRESS_BOOK.splice(contactIndex + 1)]
        resolve()
      }
    })
  }

  static deleteContact(deviceContact: DeviceContact): any {
    return new Promise((resolve, reject) => {
      if (config.canWriteToAddressBook) {
        Contacts.deleteContact(deviceContact.toObject(), callback(resolve, reject))
      } else {
        const contactIndex = findAddressBookContactIndex(deviceContact)
        ADDRESS_BOOK = [...ADDRESS_BOOK.splice(contactIndex, 1), ...ADDRESS_BOOK.splice(contactIndex + 1)]
        resolve()
      }
    })
  }
}

export default ContactsWrapper
