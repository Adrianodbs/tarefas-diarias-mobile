import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Register from '../pages/register'
import Tasks from '../pages/tasks'
import Dashboard from '../pages/dashboard'

const Stack = createNativeStackNavigator()

export function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Tasks"
        component={Tasks}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}
