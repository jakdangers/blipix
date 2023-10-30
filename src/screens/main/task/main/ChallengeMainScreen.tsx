import React, { useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CalendarProvider, WeekCalendar } from 'react-native-calendars'
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking'
import { Box, HStack, Text } from '@gluestack-ui/themed'
import { Platform } from 'react-native'
import moment from 'moment-timezone'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import { useCameraPermission } from 'react-native-vision-camera'
import { MeStackScreenProps } from '../../../../navigation/types'
import { colors, constants, queryKeys } from '../../../../utils/consts'
import { MissionHistory, MissionHistoryResponse } from './types'
import TaskCard from './TaskCard'
import ChallengeFab from './ChallengeFab'
import axiosInstance from '../../../../utils/api'
import { userAuthContextState } from '../../../../state/userAuthContext'

export type MarkedDates = {
  [key: string]: MarkingProps
}

interface MarkDate {
  marked: boolean
  date: string
}

const sampleMarkedDates: MarkDate[] = [
  {
    date: '2023-10-06',
    marked: true,
  },
  {
    date: '2023-10-05',
    marked: true,
  },
  {
    date: '2023-10-04',
    marked: true,
  },
]

export function getMarkedDates(markDates: MarkDate[]) {
  const marked: MarkedDates = {}

  markDates.forEach((item) => {
    if (item.marked) {
      marked[item.date] = { marked: true }
    }
  })

  return marked
}

export interface CalendarDates {
  currentDay: Date
  startOfWeek: Date
  endOfWeek: Date
}

const CalendarHeaderTitle = (currentDate: string): string => {
  const targetDate = new Date(currentDate)
  const year = targetDate.getFullYear() // 년도 추출
  const month = targetDate.getMonth() + 1 // 월 추출 (월은 0부터 시작하므로 +1 해야 함)

  return `${year}년 ${month}월`
}

export default function ChallengeMainScreen({
  route,
  navigation,
}: MeStackScreenProps<'challengeMain'>) {
  const userAuthContext = useRecoilValue(userAuthContextState)

  const currentDate = moment().tz('Asia/Seoul').format().split('T')[0]
  const [calendarDate, setCalendarDate] = React.useState<string>(currentDate)
  const [calendarHeaderTitle, setCalendarHeaderTitle] = React.useState<string>(
    CalendarHeaderTitle(currentDate)
  )
  const marked = useRef(getMarkedDates(sampleMarkedDates))

  const { data: historyRes } = useQuery({
    queryKey: [queryKeys.MULTI_CHALLENGE, calendarDate],
    queryFn: async () => {
      return axiosInstance
        .get<MissionHistoryResponse>(
          `/mission-histories/multi/${userAuthContext.id}`,
          {
            params: {
              date: calendarDate,
            },
          }
        )
        .then((res) => res.data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  // handler
  const handleNavigateToMissionHistory = (historyID: number) => {
    navigation.navigate('mainRoot', {
      screen: 'mainRootTaskPixelDetail',
      params: {
        historyID,
      },
    })
  }

  const handleNavigateToMissionCamera = (missionID: number) => {
    navigation.navigate('mainRoot', {
      screen: 'mainRootMissionCamera',
      params: {
        missionID,
      },
    })
  }

  const handleNavigateToChallengeList = () => {
    navigation.navigate('challengeList')
  }

  const handleNavigateToChallengeCreate = () => {
    navigation.navigate('mainRoot', {
      screen: 'mainRootChallengeCreate',
      params: { challengeType: constants.SINGLE },
    })
  }

  const renderItem = (item: MissionHistory, index: number) => {
    let last = false
    if (historyRes !== undefined) {
      last = index === historyRes.missionHistories.length - 1
    }

    return (
      <TaskCard
        missionHistory={item}
        last={last}
        handleNavigateToMissionHistory={handleNavigateToMissionHistory}
        handleNavigateToMissionCamera={handleNavigateToMissionCamera}
      />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.themeBlack }}>
      <HStack
        backgroundColor={colors.themeBlack}
        justifyContent="space-between"
        alignItems="center"
        px="$4"
        pt="$2"
      >
        <Text fontWeight="$bold" fontSize="$xl" color={colors.themeWhite}>
          {calendarHeaderTitle}
        </Text>
      </HStack>
      <CalendarProvider
        date={calendarDate}
        onDateChanged={(date) => {
          // const newCurrentDay = new Date(date)
          setCalendarDate(date)
        }}
        onMonthChange={(date) => {
          setCalendarHeaderTitle(CalendarHeaderTitle(date.dateString))
        }}
        theme={{
          todayButtonTextColor: colors.themeWhite,
        }}
      >
        <WeekCalendar
          firstDay={1}
          markedDates={marked.current}
          allowShadow={false}
          theme={{
            // 배경설정
            calendarBackground: colors.themeBlack,
            // 요일
            textSectionTitleColor: colors.themeWhite,
            textDayHeaderFontWeight: 'bold',
            textDayFontSize: 18,
            textDayStyle: { marginTop: Platform.OS === 'android' ? 2 : 4 },
            // 오늘
            todayBackgroundColor: colors.purple,
            textDayFontWeight: 'bold',
            todayTextColor: colors.themeBlack,
            todayDotColor: colors.themeWhite,
            // 선택 된 날짜
            selectedDayTextColor: colors.themeBlack,
            selectedDayBackgroundColor: colors.pink,
            // 과거일 색상
            dayTextColor: colors.themeWhite,
            dotStyle: { marginTop: -2 },
          }}
        />
      </CalendarProvider>
      <Box flex={6}>
        <FlashList
          renderItem={({ item, index }) => renderItem(item, index)}
          data={historyRes?.missionHistories ?? []}
          estimatedItemSize={200}
        />
      </Box>
      <ChallengeFab
        navigateToChallengeList={handleNavigateToChallengeList}
        navigateToChallengeCreate={handleNavigateToChallengeCreate}
      />
    </SafeAreaView>
  )
}
