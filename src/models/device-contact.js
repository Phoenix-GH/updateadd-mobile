// @flow

/*
  Wrapper model for the contacts read off the device's system
*/

import _ from 'lodash'
import BaseModel from './base'
import UADDContact from './updateadd-contact' // eslint-disable-line
import { generateUADDHash, generateUADDNamespace } from '../helpers/namespace'
import type { UpdateAddMergeType } from '../helpers/namespace'

const DEVICE_ID = 'device-123' // TODO generate for the device

export default class DeviceContact extends BaseModel {
  // Set to true when this contact needs to be synced back to the file system
  needsToSyncToDevice: boolean

  recordID: string

  data: SystemContactType

  originalData: SystemContactType

  mergeType: UpdateAddMergeType

  constructor(data?: SystemContactType = {
    recordID: '',
    company: '',
    emailAddresses: [],
    familyName: '',
    givenName: '',
    jobTitle: '',
    note: '',
    urlAddresses: [],
    middleName: '',
    phoneNumbers: [],
    hasThumbnail: false,
    thumbnailPath: '',
    postalAddresses: [],
  }) {
    super()
    if (data instanceof DeviceContact) {
      throw Error('Cannot send a DeviceContact into a DeviceConstructor')
    }
    if (data) {
      this.recordID = data.recordID
      this.needsToSyncToDevice = false
      this.data = _.cloneDeep(data) // TODO refactor
      this.originalData = _.cloneDeep(data)
      this.mergeType = generateUADDHash(data.note) || this.generateMergeType()
    }
  }

  generateMergeType(): UpdateAddMergeType {
    const mergeType = {
      version: '1',
      deviceId: DEVICE_ID,
      uaddId: Math.random().toString(36).substr(2, 9),
      count: 1,
      deleted: false,
    }
    this.data.note = this.syncedNotes(mergeType)
    this.needsToSyncToDevice = true
    return mergeType
  }

  toObject(): SystemContactType {
    return {
      recordID: this.recordID,
      ...this.data,
    }
  }

  isRelatedToUADDContact(contact: UADDContact) {
    return contact.syncID() === this.syncID()
  }

  syncedNotes(mergeType: ?UpdateAddMergeType): string {
    return generateUADDNamespace(this.data.note, this.mergeType || mergeType)
  }

  onlyPresentOnThisDevice(): boolean {
    return this.mergeType.deviceId === DEVICE_ID && this.mergeType.count === 1
  }

  syncID() {
    const syncID = this.mergeType.uaddId
    if (!syncID) {
      console.error('[FATAL] No syncID', this)
    }
    return syncID
  }

  syncTo(syncTo: DeviceContact) { // eslint-disable-line
    console.error('Not implemented')
    // Copy system information to handle the write back

    // Copy UAddInformation to handle the cloud instance
  }


  diff(): ?{ [string]: [Object, Object] } {
    const diff = {}

    // This assumes no top-level keys are added
    Object.keys(this.data).forEach((key) => {
      const goingTo = this.data[key]
      const fromValue = this.originalData[key]
      if (!_.isEqual(goingTo, fromValue)) {
        diff[key] = [fromValue || '~empty~', goingTo || '~empty~']
      }
    })
    if (Object.keys(diff).length > 0) {
      return diff
    }
    return null
  }
}
