import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { AccountStackParamList } from './types'
import AccountLoginScreen from '../../screens/account/login/AccountLoginScreen'

const AccountStack = createNativeStackNavigator<AccountStackParamList>()

export default function AccountStackNavigator() {
  return (
    <AccountStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="login"
    >
      <AccountStack.Screen name="login" component={AccountLoginScreen} />
    </AccountStack.Navigator>
  )
}
