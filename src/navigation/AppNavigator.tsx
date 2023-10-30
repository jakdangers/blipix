import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { RootStackParamList } from './types'
import MainBottomTabNavigator from './main/MainBottomTabNavigator'
import AccountStackNavigator from './account/AccountStackNavigator'
import MainRootStackNavigator from './main/MainRootStackNavigator'

export const AppStack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigator() {
  // TODO : 로그인 여부에 따라서 다른 스택을 보여줘야 한다.
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="main" component={MainBottomTabNavigator} />
      <AppStack.Screen name="account" component={AccountStackNavigator} />
      <AppStack.Screen name="mainRoot" component={MainRootStackNavigator} />
    </AppStack.Navigator>
  )
}
