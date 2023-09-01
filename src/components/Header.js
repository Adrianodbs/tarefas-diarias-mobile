import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = ({ title }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1, // 20% da tela
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A3780'
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  }
})
