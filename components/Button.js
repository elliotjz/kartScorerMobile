import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import Colors from '../constants/Colors'

const Button = ({ text, onPress, listBtn }) => (
  <TouchableOpacity
    onPress={onPress}
    style={listBtn ? styles.listBtn : styles.btn}
  >
    <Text style={listBtn ? styles.listText : styles.text}>{text}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  btn: {
    marginVertical: 10,
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 5,
    minWidth: 200,
    elevation: 5,
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    color: Colors.primary,
  },
  listBtn: {
    marginVertical: 1,
    backgroundColor: Colors.veryLightGrey,
    padding: 10,
    width: 200,
  },
  listText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.primary,
  },
})

export default Button
