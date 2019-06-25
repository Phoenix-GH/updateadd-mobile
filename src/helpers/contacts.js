// @flow
import _ from 'lodash'
import { DeviceContact, UADDContact } from '../models'

// An array of arrays of the ids of the similar contacts

type UADDHashType = {
  [string]: UADDContact,
}

type DeviceContactHashType = {
  [string]: DeviceContact,
}

export const contactsListToHash = (contacts: Array<DeviceContact>): DeviceContactHashType => {
  const systemUADDIDContactsHash: DeviceContactHashType = {}
  contacts.forEach((contact: DeviceContact) => {
    systemUADDIDContactsHash[contact.syncID()] = contact
  })
  return systemUADDIDContactsHash
}

export const uaddContactsListToHash = (contacts: Array<UADDContact>): UADDHashType => {
  const uaddIDContactsHash: UADDHashType = {}
  contacts.forEach((contact: UADDContact) => {
    uaddIDContactsHash[contact.syncID()] = contact
  })
  return uaddIDContactsHash
}

export const buildContacts = (systemContacts: Array<SystemContactType>, uaddContacts: Array<UADDContact> = []): UADDHashType => {
  // Move all system contacts into UpdateAdd
  // These are basic contact models
  // They will have UAddId's generated as needed
  const contacts = systemContacts.map((contact: SystemContactType) => new DeviceContact(contact))

  // Make a hash of the UAddContacts
  const uaddIDContactsHash: UADDHashType = _.cloneDeep(uaddContactsListToHash(uaddContacts))

  // Lists of found vs added contacts
  const added = []
  const found = []

  // Iterate over all our system contacts and add them
  contacts.forEach((contact: DeviceContact) => {
    if (!contact.mergeType.deleted) {
      // Possibility of writing a new UAddID, and then moving the refrence when we detect another model later
      const syncID = contact.syncID()
      let uaddContact: ?UADDContact = uaddIDContactsHash[syncID]
      if (!uaddContact) {
        // This contact is unknown to the cloud.  Generate it
        added.push(contact)
        uaddContact = new UADDContact({
          id: '1', // TODO remove
          contact: contact.toObject(),
        })
      } else {
        found.push(contact)
      }
      uaddContact.associatedContacts.push(contact)
      uaddIDContactsHash[syncID] = uaddContact
    }
  })

  // Now we have hydrated UADDContact's which are linked to the system contacts
  return uaddIDContactsHash
}


// $FlowFixMe
export const needsToSyncToDevice = (contacts: Array<UADDContact>) => contacts.filter((contact: UADDContact) => contact.needsToSyncToDevice())
