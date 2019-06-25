// @flow

import { StyleSheet } from 'react-native'

import Colors from '../theme/colors'

export default StyleSheet.create({
  screenWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 65,
  },
  screenTitle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.nearBlack,
    fontSize: 24,
    lineHeight: 24,
    fontFamily: 'Gotham-Bold',
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 60,
  },
  fixToBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 0,
  },
  close: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 99,
  },
})
