import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { GroupChallengeTopTabParamList, MainRootStackParamsList } from './types'
import GroupChallengeTobTabMainScreen from '../../screens/main/group_challenge/top_tab/main/GroupChallengeTobTabMainScreen'
import { MainRootStackScreenProps } from '../types'
import GroupChallengeTobTabLiveScreen from '../../screens/main/group_challenge/top_tab/live/GroupChallengeTobTabLiveScreen'
import { colors } from '../../utils/consts'

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
        options={{
          tabBarStyle: {
            backgroundColor: colors.themeBlack,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.themeWhite,
          },
          title: '홈',
          tabBarLabelStyle: {
            color: colors.themeWhite,
            fontWeight: 'bold',
            fontSize: 16,
          },
        }}
      />
      <GroupChallengeTopTab.Screen
        name="groupChallengeTopTabLive"
        component={GroupChallengeTobTabLiveScreen}
        initialParams={{ challengeId }}
        options={{
          tabBarStyle: {
            backgroundColor: colors.themeBlack,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.themeWhite,
          },
          title: '라이브s',
          tabBarLabelStyle: {
            color: colors.themeWhite,
            fontWeight: 'bold',
            fontSize: 16,
          },
        }}
      />
    </GroupChallengeTopTab.Navigator>
  )
}
