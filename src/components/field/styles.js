// @flow

import { StyleSheet } from 'react-native'
import Colors from '../../theme/colors'

export default StyleSheet.create({
  textInputRow: {
    width: '100%',
    marginBottom: 25,
  },
  textInputLabel: {
    position: 'relative',
    left: -6,
    fontSize: 11,
    lineHeight: 24,
    fontFamily: 'Gotham-Bold',
    textTransform: 'uppercase',
  },
  textInput: {
    width: '100%',
    height: 50,
    margin: 0,
    paddingLeft: 0,
    paddingRight: 0,
    color: Colors.nearBlack,
    fontSize: 14,
    lineHeight: 50,
    fontFamily: 'Gotham-Book',
    borderStyle: 'solid',
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
  },
  textInputError: {
    borderBottomColor: Colors.error,
  },
  textInputErrorText: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 7,
    paddingRight: 7,
    color: Colors.error,
    fontSize: 11,
    fontFamily: 'Gotham-Book',
    backgroundColor: Colors.errorBackground,
  },
})
