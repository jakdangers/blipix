import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import {
  Box,
  Button,
  ButtonIcon,
  HStack,
  Switch,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { ArrowLeftIcon } from 'lucide-react-native'
import { MainRootStackScreenProps } from '../../../../navigation/types'
import { colors } from '../../../../utils/consts'

export default function ProfileAlarmScreen({
  route,
  navigation,
}: MainRootStackScreenProps<'mainRootProfileAlarm'>) {
  const handleNavigateToBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.themeBlack }}>
      <HStack
        backgroundColor={colors.themeBlack}
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
            알림 설정
          </Text>
        </Box>
        <Box flex={1} />
      </HStack>
      <ScrollView>
        <VStack p="$6" space="lg">
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$lg" fontWeight="$bold" color={colors.themeWhite}>
              전체 알림
            </Text>
            <Switch
              size="md"
              trackColor={{
                true: colors.pink,
                false: colors.grey,
              }}
            />
          </HStack>
          <Text color={colors.iconColor}>픽셀 및 스레드</Text>
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$lg" color={colors.themeWhite}>
              픽셀 시작 전 알림
            </Text>
            <Switch
              size="md"
              trackColor={{
                true: colors.pink,
                false: colors.grey,
              }}
            />
          </HStack>
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$lg" color={colors.themeWhite}>
              새 이모티콘 스레드
            </Text>
            <Switch
              size="md"
              trackColor={{
                true: colors.pink,
                false: colors.grey,
              }}
            />
          </HStack>
          <Text color={colors.iconColor}>친구 초대 및 같이하기</Text>
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontWeight="$bold" color={colors.themeWhite}>
              친구 초대
            </Text>
            <Switch
              size="md"
              trackColor={{
                true: colors.pink,
                false: colors.grey,
              }}
            />
          </HStack>
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontWeight="$bold" color={colors.themeWhite}>
              같이 하기
            </Text>
            <Switch
              size="md"
              trackColor={{
                true: colors.pink,
                false: colors.grey,
              }}
            />
          </HStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}
