import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { GroupChallengeTopTabParamList, MainRootStackParamsList } from './types'
import GroupChallengeTobTabMainScreen from '../../screens/main/group_challenge/top_tab/main/GroupChallengeTobTabMainScreen'
import { MainRootStackScreenProps } from '../types'

const GroupChallengeTopTab =
  createMaterialTopTabNavigator<GroupChallengeTopTabParamList>()

export default function MainGroupChallengeTopTabNavigator({
  route,
}: MainRootStackScreenProps<'mainRootGroupChallengeTopTab'>) {
  const { challengeId } = route.params

  return (
    <GroupChallengeTopTab.Navigator>
      <GroupChallengeTopTab.Screen
        name="groupChallengeTopTabMain"
        component={GroupChallengeTobTabMainScreen}
        initialParams={{ challengeId }}
      />
      <GroupChallengeTopTab.Screen
        name="groupChallengeTopTabLive"
        component={GroupChallengeTobTabMainScreen}
        initialParams={{ challengeId }}
      />
    </GroupChallengeTopTab.Navigator>
  )
}
