import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { MainBottomTabParamList } from './types'
import MainTaskStackNavigator from './MainTaskStackNavigator'
import MainProfileStackNavigator from './MainProfileStackNavigator'
import { colors } from '../../utils/consts'
import MainGroupChallengeStackNavigator from './MainGroupChallengeStackNavigator'

const MainBottomTab = createBottomTabNavigator<MainBottomTabParamList>()

export default function MainBottomTabNavigator() {
  return (
    <MainBottomTab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home'
          if (route.name === 'friend') {
            iconName = 'fire'
          } else if (route.name === 'make') {
            iconName = 'play'
          } else if (route.name === 'setting') {
            iconName = 'user-alt'
          }
          return (
            <FontAwesome5 name={iconName} solid size={size} color={color} />
          )
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.themeWhite,
        tabBarInactiveTintColor: colors.iconColor,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: colors.themeBlack,
          borderTopColor: colors.borderColor,
          paddingBottom: 10,
        },
        tabBarIconStyle: {
          width: 30,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      })}
    >
      <MainBottomTab.Screen
        name="task"
        component={MainTaskStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <MainBottomTab.Screen
        name="friend"
        component={MainGroupChallengeStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <MainBottomTab.Screen
        name="setting"
        component={MainProfileStackNavigator}
        options={{
          headerShown: false,
        }}
      />
    </MainBottomTab.Navigator>
  )
}
