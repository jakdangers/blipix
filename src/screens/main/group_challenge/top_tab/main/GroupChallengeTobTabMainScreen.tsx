import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from '@gluestack-ui/themed'
import { colors } from '../../../../../utils/consts'
import { GroupChallengeTopTabScreenProps } from '../../../../../navigation/types'

export default function GroupChallengeTobTabMainScreen({
  route,
}: GroupChallengeTopTabScreenProps<'groupChallengeTopTabMain'>) {
  const { challengeId } = route.params

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.themeBlack }}>
      <Text>{challengeId}</Text>
    </SafeAreaView>
  )
}
