// @flow

import { StyleSheet } from 'react-native'
import Colors from '../../theme/colors'

export default StyleSheet.create({
  checkboxContainer: {
    width: '100%',
    marginBottom: 25,
  },
  checkbox: {
    padding: 0,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  checkboxText: {
    color: Colors.nearBlack,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'normal',
    fontFamily: 'Gotham-Book',
    marginRight: 0,
  },
})
