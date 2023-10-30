import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ButtonIcon, Pressable, Text } from '@gluestack-ui/themed'
import { ArrowLeftIcon } from 'lucide-react-native'
import { MainRootStackParamsList } from './types'
import TaskPixelDetailScreen from '../../screens/main/task/pixel_detail/TaskPixelDetailScreen'
import TaskUpdateScreen from '../../screens/main/task/update/TaskUpdateScreen'
import ProfileSettingScreen from '../../screens/main/profile/setting/ProfileSettingScreen'
import ProfileAlarmScreen from '../../screens/main/profile/alarm/ProfileAlarmScreen'
import ProfileTOSScreen from '../../screens/main/profile/tos/ProfileTOSScreen'
import ProfilePrivacyScreen from '../../screens/main/profile/privacy/ProfilePrivacyScreen'
import ProfileUpdateScreen from '../../screens/main/profile/update/ProfileUpdateScreen'
import TaskCollaborateScreen from '../../screens/main/task/collaborate/TaskCollaborateScreen'
import MissionCameraScreen from '../../screens/main/task/camera/MissionCameraScreen'
import ChallengeCreateScreen from '../../screens/main/root/challenge_create/ChallengeCreateScreen'
import MainGroupChallengeTopTabNavigator from './MainGroupChallengeTopTabNavigator'
import { colors } from '../../utils/consts'

const MainRootStack = createNativeStackNavigator<MainRootStackParamsList>()

export default function MainRootStackNavigator() {
  return (
    <MainRootStack.Navigator>
      <MainRootStack.Screen
        name="mainRootChallengeCreate"
        component={ChallengeCreateScreen}
        options={{ headerShown: false }}
      />
      <MainRootStack.Screen
        name="mainRootTaskUpdate"
        component={TaskUpdateScreen}
        options={{ headerShown: false }}
      />
      <MainRootStack.Screen
        name="mainRootTaskPixelDetail"
        component={TaskPixelDetailScreen}
        options={{ headerShown: false }}
      />
      <MainRootStack.Screen
        name="mainRootTaskCollaborate"
        component={TaskCollaborateScreen}
        options={{ headerShown: false }}
      />
      <MainRootStack.Screen
        name="mainRootProfileSetting"
        component={ProfileSettingScreen}
        options={{ headerShown: false }}
      />
      <MainRootStack.Screen
        name="mainRootProfileAlarm"
        component={ProfileAlarmScreen}
        options={{ headerShown: false }}
      />
      <MainRootStack.Screen
        name="mainRootProfileTOS"
        component={ProfileTOSScreen}
        options={{ headerShown: false }}
      />
      <MainRootStack.Screen
        name="mainRootProfilePrivacy"
        component={ProfilePrivacyScreen}
        options={{ headerShown: false }}
      />
      <MainRootStack.Screen
        name="mainRootProfileUpdate"
        component={ProfileUpdateScreen}
        options={{ headerShown: false }}
      />
      <MainRootStack.Screen
        name="mainRootMissionCamera"
        component={MissionCameraScreen}
        options={{ headerShown: false }}
      />
      <MainRootStack.Screen
        name="mainRootGroupChallengeTopTab"
        component={MainGroupChallengeTopTabNavigator}
        options={({ navigation }) => ({
          headerTitle: '그룹 챌린지',
          headerTintColor: colors.themeWhite,
          headerStyle: {
            backgroundColor: colors.themeBlack,
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <ButtonIcon
                as={ArrowLeftIcon}
                size="xl"
                color={colors.themeWhite}
              />
            </Pressable>
          ),
        })}
      />
    </MainRootStack.Navigator>
  )
}
