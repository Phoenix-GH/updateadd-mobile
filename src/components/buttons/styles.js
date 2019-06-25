// @flow

import { StyleSheet } from 'react-native'
import Colors from '../../theme/colors'

export default StyleSheet.create({
  submitButton: {
    width: '100%',
    height: 50,
    lineHeight: 50,
    marginTop: 5,
    marginBottom: 30,
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Gotham-Book',
  },
})
