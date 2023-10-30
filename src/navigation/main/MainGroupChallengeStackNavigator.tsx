import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GroupChallengeStackParamList } from './types'
import GroupChallengeMainScreen from '../../screens/main/group_challenge/main/GroupChallengeMainScreen'

const GroupChallenge =
  createNativeStackNavigator<GroupChallengeStackParamList>()

export default function MainGroupChallengeStackNavigator() {
  return (
    <GroupChallenge.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="groupChallengeMain"
    >
      <GroupChallenge.Screen
        name="groupChallengeMain"
        component={GroupChallengeMainScreen}
      />
    </GroupChallenge.Navigator>
  )
}
