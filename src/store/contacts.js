// @flow

import { dispatchReducer, runReducers } from '../helpers/dispatch-and-reduce'
import C from '../constants'
import { UADDContact } from '../models'

export const initialState: ContactStoreState = {
  contacts: null,
  systemContacts: null,
  systemContactsStatus: 'IDLE',
  cloudContacts: null,
}


export const dispatchers = {
  storeSystemContacts: dispatchReducer<ContactStoreState, ?Array<SystemContactType>>(
    C.STORE_SYSTEM_CONTACTS,
    (state, systemContacts): ContactStoreState => ({
      ...state,
      systemContacts,
      systemContactsStatus: 'IDLE',
    }),
  ),
  setSystemContactsSyncStatus: dispatchReducer<ContactStoreState, SystemContactsSyncStatus>(
    C.SET_SYSTEM_CONTACTS_SYNC_STATUS,
    (state, systemContactsStatus): ContactStoreState => ({
      ...state,
      systemContactsStatus,
    }),
  ),
  storeUpdateAddContacts: dispatchReducer<ContactStoreState, ?Array<UADDContact>>(
    C.STORE_UPDATEADD_CONTACTS,
    (state, contacts): ContactStoreState => ({ ...state, contacts }),
  ),
  setUpdateAddContactByID: dispatchReducer<ContactStoreState, UADDContact>(
    C.STORE_UPDATEADD_CONTACT_BY_ID,
    (state, contact): ContactStoreState => {
      const { contacts } = state
      if (contacts) {
        const contactIndex = contacts.findIndex((searchContact: UADDContact) => searchContact.uaddId === contact.uaddId)
        const updatedContacts = [...contacts.splice(contactIndex, 1, contact), ...contacts.splice(contactIndex + 1)]
        return {
          ...state,
          contacts: updatedContacts,
        }
      }
      return {
        ...state,
      }
    },
  ),
  loadDebugContacts: dispatchReducer<ContactStoreState, null>(
    C.STORE_LOAD_DEBUG_CONTACTS,
    (state): ContactStoreState => ({ ...state }),
  ),
  startUp: dispatchReducer<ContactStoreState, null>(C.START_UP, (state): ContactStoreState => ({ ...state })),
}

export const reducer = (state: ContactStoreState = { ...initialState }, action: StandardAction): ContactStoreState => runReducers(state, dispatchers, action)
