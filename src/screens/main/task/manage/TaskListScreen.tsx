import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Box, Button, ButtonIcon, HStack, Text } from '@gluestack-ui/themed'
import { ArrowLeftIcon } from 'lucide-react-native'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import { colors, constants, queryKeys } from '../../../../utils/consts'
import { MeStackScreenProps } from '../../../../navigation/types'
import TaskCard from './TaskCard'
import { Mission, Task } from './types'
import axiosInstance from '../../../../utils/api'
import { userAuthContextState } from '../../../../state/userAuthContext'
import useRefreshOnFocus from '../../../../hooks/useRefreshOnFocus'

const sd: Task[] = [
  {
    taskID: '1',
    title: '아침에 조깅하기',
    emoji: '👍',
    duration: constants.PERIOD,
    startDate: new Date(),
    endDate: new Date(),
    week: [constants.MONDAY, constants.TUESDAY],
    plannedTime: new Date(),
    alarm: true,
    participants: [
      {
        userID: '1',
        fullName: '김남형',
        userName: 'nakim',
      },
      {
        userID: '2',
        fullName: '김효주',
        userName: 'hyoju',
      },
    ],
  },
]

interface ListMissionResponse {
  missions: Mission[]
}

export default function TaskListScreen({
  route,
  navigation,
}: MeStackScreenProps<'challengeList'>) {
  const userAuthContext = useRecoilValue(userAuthContextState)

  const { data: listMissionRes, refetch: refetchMission } = useQuery({
    queryKey: [queryKeys.MISSION, 'missionListScreen'],
    queryFn: async () => {
      return axiosInstance
        .get<ListMissionResponse>(`/missions/user/${userAuthContext.id}`)
        .then((res) => res.data)
    },
  })
  useRefreshOnFocus(refetchMission)

  const handleNavigateToBack = () => {
    navigation.goBack()
  }

  const handleNavigateToTaskUpdate = () => {
    navigation.navigate('mainRoot', {
      screen: 'mainRootTaskUpdate',
    })
  }

  const renderItem = (item: Mission, index: number) => {
    const { length } = sd

    return (
      <TaskCard
        mission={item}
        last={index === length - 1}
        navigateToTaskUpdate={handleNavigateToTaskUpdate}
      />
    )
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.themeBlack, paddingTop: 6 }}
    >
      <HStack
        backgroundColor={colors.themeBlack}
        borderColor={colors.borderColor}
        borderBottomWidth="$1"
        h="$10"
        px="$4"
        justifyContent="space-between"
        alignItems="center"
        space="md"
      >
        <Box flex={1}>
          <Button
            size="xs"
            backgroundColor={colors.themeBlack}
            onPress={handleNavigateToBack}
          >
            <ButtonIcon as={ArrowLeftIcon} size="xl" />
          </Button>
        </Box>
        <Box flex={8} alignItems="center">
          <Text fontWeight="$bold" fontSize="$xl" color={colors.themeWhite}>
            픽셀 관리하기
          </Text>
        </Box>
        <Box flex={1} />
      </HStack>
      {listMissionRes && (
        <FlashList
          renderItem={({ item, index }) => renderItem(item, index)}
          data={listMissionRes.missions}
          estimatedItemSize={261}
        />
      )}
    </SafeAreaView>
  )
}
