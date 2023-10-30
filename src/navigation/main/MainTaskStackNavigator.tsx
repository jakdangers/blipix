import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { ChallengeStackParamList } from './types'
import ChallengeMainScreen from '../../screens/main/task/main/ChallengeMainScreen'
import TaskListScreen from '../../screens/main/task/manage/TaskListScreen'

const TaskStack = createNativeStackNavigator<ChallengeStackParamList>()

export default function MainTaskStackNavigator() {
  return (
    <TaskStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="challengeMain"
    >
      <TaskStack.Screen name="challengeMain" component={ChallengeMainScreen} />
      <TaskStack.Screen name="challengeList" component={TaskListScreen} />
    </TaskStack.Navigator>
  )
}
