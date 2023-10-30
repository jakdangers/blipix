import React from 'react'
import { HStack, Text } from '@gluestack-ui/themed'
import { FlashList } from '@shopify/flash-list'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import { GroupChallengeStackScreenProps } from '../../../../navigation/types'
import { colors, constants, queryKeys } from '../../../../utils/consts'
import BattleFab from './BattleFab'
import GroupChallengeCard from './GroupChallengeCard'
import axiosInstance from '../../../../utils/api'
import { userAuthContextState } from '../../../../state/userAuthContext'
import useRefreshOnFocus from '../../../../hooks/useRefreshOnFocus'
import { GroupChallenge } from '../types'

interface GroupChallengeResponse {
  challenges: GroupChallenge[]
}

export default function GroupChallengeMainScreen({
  route,
  navigation,
}: GroupChallengeStackScreenProps<'groupChallengeMain'>) {
  const userAuthContext = useRecoilValue(userAuthContextState)

  const { data: challengeRes, refetch } = useQuery({
    queryKey: [queryKeys.MULTI_CHALLENGE],
    queryFn: async () => {
      return axiosInstance
        .get<GroupChallengeResponse>(`/challenges/user/${userAuthContext.id}`, {
          params: {
            type: constants.MULTI,
          },
        })
        .then((res) => res.data)
    },
  })
  useRefreshOnFocus(refetch)

  const handleNavigateToChallengeCreate = () => {
    navigation.navigate('mainRoot', {
      screen: 'mainRootChallengeCreate',
      params: { challengeType: constants.MULTI },
    })
  }

  const handleNavigateToGroupChallenge = () => {
    navigation.navigate('mainRoot', {
      screen: 'mainRootGroupChallengeTopTab',
      params: {
        challengeId: 1,
      },
    })
  }

  const renderItem = (challenge: GroupChallenge, index: number) => {
    // return <GroupChallengeCard {...challenge} />
    return (
      <GroupChallengeCard
        id={challenge.id}
        handleNavigateToGroupChallenge={handleNavigateToGroupChallenge}
        userId={challenge.userId}
        title={challenge.title}
        description={challenge.description}
        emoji={challenge.emoji}
        startDate={challenge.startDate}
        endDate={challenge.endDate}
        planTime={challenge.planTime}
        alarm={challenge.alarm}
        weekDay={challenge.weekDay}
        duration={challenge.duration}
        type={challenge.type}
        status={challenge.status}
      />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.themeBlack }}>
      <HStack
        backgroundColor={colors.themeBlack}
        h="$10"
        px="$4"
        alignItems="center"
        space="md"
      >
        <Text fontWeight="$bold" fontSize="$xl" color={colors.themeWhite}>
          그룹 챌린지
        </Text>
      </HStack>
      {challengeRes && (
        <FlashList
          renderItem={({ item, index }) => renderItem(item, index)}
          data={challengeRes.challenges}
          estimatedItemSize={100}
        />
      )}
      <BattleFab
        navigateToChallengeList={() => console.log('d')}
        navigateToChallengeCreate={handleNavigateToChallengeCreate}
      />
    </SafeAreaView>
  )
}
