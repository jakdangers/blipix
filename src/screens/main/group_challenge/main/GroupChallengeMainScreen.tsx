import React from 'react'
import {
  Box,
  HStack,
  Icon,
  Pressable,
  SearchIcon,
  Text,
} from '@gluestack-ui/themed'
import { FlashList } from '@shopify/flash-list'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import { GroupChallengeStackScreenProps } from '../../../../navigation/types'
import { colors, constants, queryKeys } from '../../../../utils/consts'
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

  const handleNavigateToChallengeGroupCreate = () => {
    navigation.navigate('mainRoot', {
      screen: 'mainRootGroupChallengeGroupCreate',
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
        justifyContent="center"
        alignItems="center"
        space="md"
      >
        <Text fontWeight="$bold" fontSize="$xl" color={colors.themeWhite}>
          그룹 챌린지
        </Text>
      </HStack>
      <Pressable
        mx="$4"
        mb="$4"
        backgroundColor={colors.actionColor}
        rounded="$md"
        onPress={handleNavigateToChallengeGroupCreate}
      >
        <HStack alignItems="center" px="$4" py="$2" space="md">
          <Icon as={SearchIcon} w="$4" h="$4" color={colors.themeWhite} />
          <Text color={colors.themeWhite}>그룹 챌린지 코드로 추가하기</Text>
        </HStack>
      </Pressable>
      <Pressable
        mx="$4"
        h="$20"
        p="$4"
        backgroundColor={colors.actionColor}
        rounded="$md"
        onPress={handleNavigateToChallengeGroupCreate}
      >
        <Text color={colors.themeWhite} fontWeight="$bold">
          그룹 챌린지 생성 😆
        </Text>
        <Text color={colors.themeWhite}>
          친구와 함께하면 더욱 즐거운 챌린지!
        </Text>
      </Pressable>
      <Box m="$4">
        <Text color={colors.themeWhite} fontWeight="$bold" size="xl">
          그룹 챌린지
        </Text>
      </Box>
      {challengeRes && (
        <FlashList
          renderItem={({ item, index }) => renderItem(item, index)}
          data={challengeRes.challenges}
          estimatedItemSize={100}
        />
      )}
    </SafeAreaView>
  )
}
