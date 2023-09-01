import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MessageScore = ({ message }) => {
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  )
}

export default MessageScore

const styles = StyleSheet.create({
  messageContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#4A3780',
    padding: 20,
    borderRadius: 5,
    zIndex: 1
  },

  messageText: {
    color: 'white',
    fontWeight: 'bold'
  }
})
