// @flow

import { StyleSheet } from 'react-native'
import Colors from '../../theme/colors'

export default StyleSheet.create({
  formContainer: {
    width: '87.5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disclaimer: {
    width: '100%',
    color: Colors.darkGrey,
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
    marginBottom: 25,
  },
  checkbox: {
    width: '100%',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginBottom: 25,
  },
  checkboxText: {
    color: Colors.nearBlack,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'normal',
    fontFamily: 'Gotham-Book',
  },
})
