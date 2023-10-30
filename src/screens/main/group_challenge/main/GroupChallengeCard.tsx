import React from 'react'
import {
  Box,
  Button,
  ButtonText,
  Divider,
  HStack,
  Pressable,
  Text,
} from '@gluestack-ui/themed'
import { Badge } from 'react-native-ui-lib'
import moment from 'moment'
import { colors } from '../../../../utils/consts'
import { GroupChallenge } from '../types'

interface GroupChallengeCardProps extends GroupChallenge {
  handleNavigateToGroupChallenge: (challengeId: number) => void
}

export default function GroupChallengeCard({
  id,
  title,
  description,
  emoji,
  planTime,
  handleNavigateToGroupChallenge,
}: GroupChallengeCardProps) {
  // const k

  return (
    <Pressable
      rounded="$lg"
      backgroundColor={colors.actionColor}
      py="$4"
      mx="$4"
      mb="$4"
      onPress={() => handleNavigateToGroupChallenge(id)}
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"
        space="md"
        px="$4"
        mb="$4"
      >
        <HStack space="md">
          <Text color={colors.themeWhite}>{emoji}</Text>
          <Text color={colors.themeWhite} fontWeight="$bold">
            {title}
          </Text>
        </HStack>
        <Text color={colors.themeWhite} fontWeight="$bold">
          {moment(planTime).format('LT')}
        </Text>
      </HStack>
      <Box h="$10" px="$4" mb="$4">
        <Text color={colors.themeWhite}>{description}</Text>
      </Box>
      <Divider mb="$4" bg={colors.grey} />
      <HStack justifyContent="space-between" alignItems="center" px="$4">
        <HStack alignItems="center" space="sm">
          <Text color={colors.themeWhite}>오늘의 챌린지</Text>
          <Badge label="12" size={16} backgroundColor={colors.purple} />
        </HStack>
        <Button backgroundColor={colors.pink} size="xs">
          <ButtonText color={colors.themeBlack}>입장하기</ButtonText>
        </Button>
      </HStack>
    </Pressable>
  )
}
