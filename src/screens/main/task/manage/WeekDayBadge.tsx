import React from 'react'
import { Center, HStack, Text } from '@gluestack-ui/themed'
import { colors, constants } from '../../../../utils/consts'

interface WeekDayProps {
  weekDay: string[]
}

function getWeekText(week: string[]) {
  const weekText: string[] = []

  week.forEach((day) => {
    if (day === constants.MONDAY) {
      weekText.push('월')
    }
    if (day === constants.TUESDAY) {
      weekText.push('화')
    }
    if (day === constants.WEDNESDAY) {
      weekText.push('수')
    }
    if (day === constants.THURSDAY) {
      weekText.push('목')
    }
    if (day === constants.FRIDAY) {
      weekText.push('금')
    }
    if (day === constants.SATURDAY) {
      weekText.push('토')
    }
    if (day === constants.SUNDAY) {
      weekText.push('일')
    }
  })

  return weekText.join(', ')
}

// const week = ['월', '화', '수', '목', '금', '토', '일']
const week = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
]

const isSelectedWeekDay = (weekDay: string[], day: string): boolean => {
  return weekDay.includes(day)
}

const convertToKr = (day: string): string => {
  if (day === constants.MONDAY) {
    return '월'
  }
  if (day === constants.TUESDAY) {
    return '화'
  }
  if (day === constants.WEDNESDAY) {
    return '수'
  }
  if (day === constants.THURSDAY) {
    return '목'
  }
  if (day === constants.FRIDAY) {
    return '금'
  }
  if (day === constants.SATURDAY) {
    return '토'
  }

  return '일'
}

export default function WeekDayBadge({ weekDay }: WeekDayProps) {
  return (
    <HStack justifyContent="flex-end" space="xs">
      {week.map((item) => (
        <Center
          w="$6"
          h="$6"
          bgColor={isSelectedWeekDay(weekDay, item) ? colors.pink : colors.grey}
          rounded="$md"
          key={item}
        >
          <Text fontWeight="$bold" color={colors.themeBlack}>
            {convertToKr(item)}
          </Text>
        </Center>
      ))}
    </HStack>
  )
}
