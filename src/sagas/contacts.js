// @flow

import _ from 'lodash'
import type { Saga } from 'redux-saga'
import {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects'

import Contacts from '../helpers/react-native-contacts'
import SampleAddressBook from '../../__mocks__/full-address-book'

import Actions from '../constants'
import selectors from '../selectors'
import { DeviceContact, UADDContact } from '../models'
import { buildContacts } from '../helpers/contacts'
import { dispatchers as contactDispatchers } from '../store/contacts'


function* fetchSystemContacts(): Saga<*> {
  console.log('Fetching system contacts')
  yield put(contactDispatchers.setSystemContactsSyncStatus.dispatch('READING'))
  try {
    // const contactsAccessPermited = yield call(checkContactsPermission)
    // if (contactsAccessPermited) {
    const allContacts = yield call(Contacts.getAll)
    yield put(contactDispatchers.storeSystemContacts.dispatch(allContacts))
    yield put(contactDispatchers.setSystemContactsSyncStatus.dispatch('IDLE'))
  // yield put(contacts.dispatchers.setContacts.dispatch(modelContacts))
    // } else {
    //   yield put(contacts.dispatchers.hasPermission.dispatch(false))
    // }
  } catch (error) {
    console.error(error)
    console.error('Could not read from contacts')
    yield put(contactDispatchers.setSystemContactsSyncStatus.dispatch('ERROR'))
    // yield put(contacts.dispatchers.error.dispatch(e))
  }
}

function* fetchCloudContacts(): Saga<*> { // eslint-disable-line

}

function* mergeContacts(): Saga<*> {
  // Grab the contacts from the store
  const systemContacts = yield select(selectors.contacts.getSystemContacts)
  const cloudContacts = yield select(selectors.contacts.getCloudContacts)

  if (systemContacts.length) {
    // We have loaded the system contacts

    // Merge the two groups together
    const contactsHash = buildContacts(systemContacts, cloudContacts)
    const contacts = Object.keys(contactsHash).map(key => contactsHash[key])

    yield put(contactDispatchers.storeUpdateAddContacts.dispatch(contacts))
  }
}

function* syncContactsToDevice(): Saga<*> {
  const uaddContacts = yield select(selectors.contacts.getContacts)
  const needsToSync = uaddContacts.filter((c: UADDContact) => c.needsToSyncToDevice())
  for (let contactIdx = 0; contactIdx < needsToSync.length; contactIdx++) {
    const contact = needsToSync[contactIdx]
    const newContact = _.cloneDeep(contact)
    // Sync the contact
    console.log('Syncing Contact', contact)
    const newAssociatedContacts = []
    for (let deviceContactIdx = 0; deviceContactIdx < newContact.associatedContacts.length; deviceContactIdx++) {
      const deviceContact = newContact.associatedContacts[deviceContactIdx]
      // TODO we are updating the *system contacts* without tracking that they have been updated in the store
      console.log('Writing contact', deviceContact)
      yield call(Contacts.updateContact, deviceContact)
      // TODO lots of test cases for confirm this path
      // TODO need to set sync to false
      newAssociatedContacts.push(deviceContact)
    }
    newContact.associatedContacts = newAssociatedContacts
    // Then set it back in the store
    // TODO move the store to be a hash
    yield put(contactDispatchers.setUpdateAddContactByID.dispatch(newContact))
  }
}

function* hydrateAllContacts(): Saga<*> {
  console.log('Hydrating all contacts')
  // This will guide the user through onboarding
  yield* fetchSystemContacts()
  console.log('Merging contacts')
  yield* mergeContacts()
  console.log('Syncing Contacts to device')
  yield* syncContactsToDevice()
  console.log('Syncing Contacts to cloud')

  console.log('🎉 Contacts synced')
}


// Testing method to override all local contacts
function* loadDebugContacts(): Saga<*> {
  // Delete all contacts on device
  const uaddContacts = yield select(selectors.contacts.getContacts)
  for (let contactIdx = 0; contactIdx < uaddContacts.length; contactIdx++) {
    const contact = uaddContacts[contactIdx]
    const newContact = _.cloneDeep(contact)
    for (let deviceContactIdx = 0; deviceContactIdx < newContact.associatedContacts.length; deviceContactIdx++) {
      const deviceContact = newContact.associatedContacts[deviceContactIdx]
      yield call(Contacts.deleteContact, deviceContact)
    }
  }
  yield put(contactDispatchers.storeSystemContacts.dispatch([]))

  // Grab preloaded address book
  const sampleAddressBook = _.cloneDeep(SampleAddressBook)
  for (let contactIdx = 0; contactIdx < sampleAddressBook.length; contactIdx++) {
    const contact = sampleAddressBook[contactIdx]
    contact.recordID = ''
    yield call(Contacts.addContact, new DeviceContact(contact))
  }

  // Reload the store with the new information
  yield* hydrateAllContacts()
}


function* sagas(): Saga<*> {
  /* eslint-disable */
  console.log('Contacts sagas loaded')
  /* eslint-enable */
  yield takeLatest(Actions.START_UP, hydrateAllContacts)
  yield takeLatest(Actions.FETCH_SYSTEM_CONTACTS, fetchSystemContacts)
  yield takeLatest(Actions.FETCH_CLOUD_CONTACTS, fetchCloudContacts)
  yield takeLatest(Actions.MERGE_CONTACTS, mergeContacts)
  yield takeLatest(Actions.STORE_LOAD_DEBUG_CONTACTS, loadDebugContacts)
}

export {
  fetchSystemContacts,
  fetchCloudContacts,
  mergeContacts,
  hydrateAllContacts,
}
export default sagas
