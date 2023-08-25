import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import Register from './src/pages/register'
import { NavigationContainer } from '@react-navigation/native'
import { Routes } from './src/routes'

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
