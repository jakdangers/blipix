import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProfileStackParamList } from './types'
import ProfileMainScreen from '../../screens/main/profile/main/ProfileMainScreen'

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>()

export default function MainProfileStackNavigator() {
  return (
    <ProfileStack.Navigator
      initialRouteName="profileMain"
      screenOptions={{ headerShown: false }}
    >
      <ProfileStack.Screen name="profileMain" component={ProfileMainScreen} />
    </ProfileStack.Navigator>
  )
}
