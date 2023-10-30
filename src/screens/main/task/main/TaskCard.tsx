import React from 'react'
import {
  Box,
  Center,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import moment from 'moment-timezone'
import { Lock } from 'lucide-react-native'
import { colors } from '../../../../utils/consts'
import { MissionHistory } from './types'

interface PixelTaskCardProps {
  missionHistory: MissionHistory
  last: boolean
  handleNavigateToMissionHistory: (pixelID: number) => void
  handleNavigateToMissionCamera: (missionID: number) => void
}

export default function TaskCard({
  missionHistory,
  last,
  handleNavigateToMissionHistory,
  handleNavigateToMissionCamera,
}: PixelTaskCardProps) {
  return (
    <VStack
      rounded="$lg"
      backgroundColor={colors.actionColor}
      mt="$4"
      mb={last ? '$4' : '$0'}
      mx="$4"
      p="$4"
      space="lg"
    >
      <HStack justifyContent="space-between">
        <Box flex={1} justifyContent="center">
          <Text fontWeight="$bold" color={colors.themeWhite}>
            {`${missionHistory.emoji} ${missionHistory.title}`}
          </Text>
        </Box>
        <Text fontWeight="$bold" color={colors.themeWhite}>
          {moment(missionHistory.planTime).format('LT')}
        </Text>
      </HStack>
      <VStack space="md" alignItems="flex-end">
        {missionHistory.id !== 0 ? (
          <Pressable
            flexDirection="row"
            onPress={() => handleNavigateToMissionHistory(missionHistory.id)}
          >
            <Image
              size="xs"
              source={{
                // uri: missionHistory.frontImage,
                uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q =80',
              }}
              rounded="$md"
              alt="Image Error"
              mr="$2"
            />
            <Image
              size="xs"
              // source={{ uri: missionHistory.backImage }}
              source={{
                uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q =80',
              }}
              rounded="$md"
              alt="Image Error"
            />
          </Pressable>
        ) : (
          <Pressable
            flexDirection="row"
            onPress={() =>
              handleNavigateToMissionCamera(missionHistory.missionID)
            }
          >
            <Center
              borderWidth="$1"
              borderColor={colors.grey}
              rounded="$md"
              w="$10"
              h="$10"
              mr="$2"
            >
              <Icon as={Lock} color={colors.grey} />
            </Center>
            <Center
              borderWidth="$1"
              borderColor={colors.grey}
              rounded="$md"
              w="$10"
              h="$10"
            >
              <Icon as={Lock} color={colors.grey} />
            </Center>
          </Pressable>
        )}
      </VStack>
    </VStack>
  )
}
