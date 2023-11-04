import React from 'react'
import { Text } from '@gluestack-ui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import moment from 'moment-timezone'
import { FlashList } from '@shopify/flash-list'
import { GroupChallengeTopTabScreenProps } from '../../../../../navigation/types'
import { colors, queryKeys } from '../../../../../utils/consts'
import GroupChallengeLiveCard from './GroupChallengeLiveCard'
import axiosInstance from '../../../../../utils/api'
import { userAuthContextState } from '../../../../../state/userAuthContext'
import { GroupChallengeHistory, GroupChallengeResponse } from './types'

export default function GroupChallengeTobTabLiveScreen({
  route,
  navigation,
}: GroupChallengeTopTabScreenProps<'groupChallengeTopTabLive'>) {
  const { challengeId } = route.params
  const userAuthContext = useRecoilValue(userAuthContextState)
  const currentDate = moment().tz('Asia/Seoul').format().split('T')[0]

  const { data: GroupChallengeHistoriesRes } = useQuery({
    queryKey: [queryKeys.MULTI_CHALLENGE_HISTORIES, 'groupChallengeTobTabLive'],
    queryFn: async () => {
      return axiosInstance
        .get<GroupChallengeResponse>(
          `challenges/histories/${userAuthContext.id}`,
          {
            params: {
              challengeId,
              date: currentDate,
            },
          }
        )
        .then((res) => res.data)
    },
  })

  const renderItem = (history: GroupChallengeHistory, index: number) => {
    return (
      <GroupChallengeLiveCard
        id={history.id}
        userId={history.userId}
        challengeId={history.challengeId}
        frontImage={history.frontImage}
        backImage={history.backImage}
      />
    )
  }

  console.log(GroupChallengeHistoriesRes?.challengeHistories ?? [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.themeBlack }}>
      <Text fontWeight="$bold" color={colors.themeWhite} textAlign="center">
        📸 오늘의 챌린지를 실시간으로 보세요
      </Text>
      <FlashList
        renderItem={({ item, index }) => renderItem(item, index)}
        data={GroupChallengeHistoriesRes?.challengeHistories ?? []}
        estimatedItemSize={200}
      />
    </SafeAreaView>
  )
}
