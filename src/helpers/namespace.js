// @flow

/*
  Facilitate writing and reading of UADD namespace on the
  device's contacts
*/

import _ from 'lodash'

export type UpdateAddMergeType = {|
  version?: string, // UADD API Version
  count?: number, // Number of known cards associated
  uaddId: string, // Unique UADD Id
  deviceId: string, // Device that created the UADDID
  deleted: boolean, // No longer show this contact in UADD
|}

const VERSION = '1'
export const UADD_DELIMITER = '~~UADD~~'
export const REGEX_UADD_REPLACEMENT = /(\~\~\UADD\~\~(.*)\~\~\UADD\~\~)/ // eslint-disable-line

export const generateUADDNamespace = (note: string = '', namespace: UpdateAddMergeType): string => {
  const {
    version = VERSION,
    count = 1,
    deviceId,
    uaddId,
    deleted,
  } = namespace
  const uaddIdString = [version, deviceId, uaddId, count, deleted ? '1' : '0'].join('/')
  const uaddNamespace = `${UADD_DELIMITER}${uaddIdString}${UADD_DELIMITER}`

  let localNote = _.clone(note)
  localNote = localNote.replace(REGEX_UADD_REPLACEMENT, uaddNamespace)
  if (localNote.indexOf(UADD_DELIMITER) === -1) {
    return `${localNote}\n\n${uaddNamespace}`
  }
  return localNote
}

export const generateUADDHash = (namespace: string): ?UpdateAddMergeType => {
  const match = namespace.match(REGEX_UADD_REPLACEMENT)
  if (match) {
    const [version, deviceId, uaddId, count, deleted] = match[2].split('/') // eslint-disable-line no-unused-vars
    return {
      version,
      deviceId,
      uaddId,
      count: parseInt(count, 10),
      deleted: deleted === '1',
    }
  }
  return null
}
