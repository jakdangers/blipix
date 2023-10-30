import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProfileStackScreenProps } from '../../../../navigation/types'
import moment from 'moment-timezone'
import 'moment/locale/ko'
import {
  Avatar,
  AvatarFallbackText,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  Icon,
  Pressable,
  Text,
  ThreeDotsIcon,
  VStack,
} from '@gluestack-ui/themed'
import { ArrowLeftIcon } from 'lucide-react-native'
import { colors } from '../../../../utils/consts'

// TODO 언어 설정에 따라 변경 가능
moment.locale('ko')

export default function ProfileMainScreen({
  route,
  navigation,
}: ProfileStackScreenProps<'profileMain'>) {
  const handleNavigateToBack = () => {
    navigation.goBack()
  }

  const handleNavigateToProfileSetting = () => {
    navigation.navigate('mainRoot', {
      screen: 'mainRootProfileSetting',
    })
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
            프로필
          </Text>
        </Box>
        <Pressable onPress={() => handleNavigateToProfileSetting()}>
          <Icon as={ThreeDotsIcon} size="xl" color={colors.themeWhite} />
        </Pressable>
      </HStack>
      <VStack
        space="md"
        justifyContent="center"
        alignItems="center"
        backgroundColor={colors.actionColor}
        mx="$4"
        py="$6"
        rounded="$md"
      >
        <Avatar bgColor="$indigo600" size="xl">
          <AvatarFallbackText>Ronald Richards</AvatarFallbackText>
        </Avatar>
        <VStack justifyContent="center" alignItems="center" space="xs">
          <Text fontSize="$2xl" fontWeight="$bold" color={colors.themeWhite}>
            김남형
          </Text>
          <Text>친구코드 dfkjdkfjdkf</Text>
        </VStack>
      </VStack>
    </SafeAreaView>
  )
}
