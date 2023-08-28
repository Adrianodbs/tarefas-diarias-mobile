import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ButtonApp = ({ onPress, title, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ButtonApp

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4A3780',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 24
  },
  buttonTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  buttonDisabled: {
    opacity: 0.6
  }
})
