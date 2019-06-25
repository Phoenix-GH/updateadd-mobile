// @flow

import { UADDContact } from '../models'

const getContactStore = (store: StoreState): ContactStoreState => store.contacts

const hasHydratedContacts = (store: StoreState): boolean => !!getContactStore(store).contacts

const getContacts = (store: StoreState): Array<UADDContact> => getContactStore(store).contacts || []

const getSystemContacts = (store: StoreState): Array<SystemContactType> => getContactStore(store).systemContacts || []

const getCloudContacts = (store: StoreState): Array<DeviceContact> => getContactStore(store).cloudContacts || []

export default {
  hasHydratedContacts,
  getContacts,
  getSystemContacts,
  getCloudContacts,
}
