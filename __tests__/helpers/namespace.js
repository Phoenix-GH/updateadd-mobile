// @flow


import { generateUADDNamespace, generateUADDHash } from '../../src/helpers/namespace'

describe('UADD namespace', () => {
  const mergeType = {
    version: '1',
    deviceId: '2',
    uaddId: '3',
    count: 1,
    deleted: false,
  }
  const note = generateUADDNamespace('', mergeType)
  it('should have a note defined', () => {
    expect(note).toBeDefined()
  })
  it('should rehydrate itself', () => {
    expect(mergeType).toStrictEqual(generateUADDHash(note))
  })
})
