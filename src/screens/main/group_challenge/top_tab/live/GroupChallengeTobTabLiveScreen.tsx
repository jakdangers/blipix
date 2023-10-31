import React from 'react'
import { Text } from '@gluestack-ui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GroupChallengeTopTabScreenProps } from '../../../../../navigation/types'
import { colors } from '../../../../../utils/consts'

export default function GroupChallengeTobTabLiveScreen({
  route,
  navigation,
}: GroupChallengeTopTabScreenProps<'groupChallengeTopTabLive'>) {
  const { challengeId } = route.params

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.themeBlack }}>
      <Text>{challengeId}</Text>
    </SafeAreaView>
  )
}
