import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { Routes } from './src/routes'
import { TaskProvider } from './src/context/TaskContext'

export default function App() {
  return (
    <NavigationContainer>
      <TaskProvider>
        <StatusBar backgroundColor={'#fff'} barStyle="light-content" />
        <Routes />
      </TaskProvider>
    </NavigationContainer>
  )
}
