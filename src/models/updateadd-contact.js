// @flow

import BaseModel from './base'
import { DeviceContact } from './' // eslint-disable-line


type UpdateAddContactType = {|
  id: string,
  contact: SystemContactType,
|}

export default class UADDContact extends BaseModel {
  uaddId: string

  needsSyncToCloud: boolean

  // This is the primary device contact, it will be the one that we merge into
  // and write back to the system.  The only information that should need to change is
  // the record id
  contact: DeviceContact

  associatedContacts: Array<DeviceContact> // TODO may be able to just make this a list of record ids

  constructor(data: UpdateAddContactType) {
    super()
    this.associatedContacts = []
    this.contact = new DeviceContact(data.contact) // TODO this isn't currently being passed correctly as data, it's still the object
    this.needsSyncToCloud = true
  }

  syncContactModels() {
    // TODO rewrite
    const otherContacts = this.associatedContacts.slice(1)
    const primary = this.primaryContact()
    const newAssociatedContacts = [primary]
    otherContacts.forEach((contact) => {
      contact.syncTo(primary)
    })

    this.associatedContacts = newAssociatedContacts
  }

  syncID() {
    return this.contact.syncID()
  }

  primaryContact(): DeviceContact {
    return this.contact
  }

  needsToSyncToDevice(): boolean {
    // Sync if we don't have any related contacts on the device, or the underlying contact has changed
    return this.associatedContacts.length === 0 || this.associatedContacts.filter(contact => contact.needsToSyncToDevice).length > 0
  }
}
