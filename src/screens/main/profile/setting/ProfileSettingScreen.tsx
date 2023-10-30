import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Avatar,
  AvatarFallbackText,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { ArrowLeftIcon } from 'lucide-react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../../../utils/consts'
import { MainRootStackScreenProps } from '../../../../navigation/types'

export default function ProfileSettingScreen({
  route,
  navigation,
}: MainRootStackScreenProps<'mainRootProfileSetting'>) {
  const handleNavigateToBack = () => {
    navigation.goBack()
  }

  const handleNavigateToProfileUpdate = () => {
    navigation.navigate('mainRootProfileUpdate')
  }

  const handleNavigateToAlarm = () => {
    navigation.navigate('mainRootProfileAlarm')
  }

  const handleNavigateToTOS = () => {
    navigation.navigate('mainRootProfileTOS')
  }

  const handleNavigateToPrivacy = () => {
    navigation.navigate('mainRootProfilePrivacy')
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
            설정
          </Text>
        </Box>
        <Box flex={1} />
      </HStack>
      <VStack mx="$4" space="md">
        <Pressable onPress={() => handleNavigateToProfileUpdate()}>
          <HStack
            backgroundColor={colors.actionColor}
            h="$20"
            px="$4"
            rounded="$md"
            justifyContent="space-between"
            alignItems="center"
            space="md"
          >
            <HStack space="sm" alignItems="center">
              <Avatar bgColor="$indigo600" size="md">
                <AvatarFallbackText>Ronald Richards</AvatarFallbackText>
              </Avatar>
              <VStack justifyContent="center">
                <Text fontWeight="$bold" color={colors.themeWhite}>
                  김남형
                </Text>
                <Text>친구코드 dfkjdkfjdkf</Text>
              </VStack>
            </HStack>
            <Icon name="chevron-forward" size={18} color={colors.grey} />
          </HStack>
        </Pressable>
        <Text>설정</Text>
        <Pressable onPress={() => handleNavigateToAlarm()}>
          <HStack
            backgroundColor={colors.actionColor}
            h="$10"
            px="$4"
            rounded="$md"
            borderBottomWidth="$1"
            borderBottomColor={colors.borderColor}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack space="md" alignItems="center">
              <Icon name="notifications" size={18} color={colors.themeWhite} />
              <Text fontWeight="$bold" color={colors.themeWhite}>
                알림
              </Text>
            </HStack>
            <Icon name="chevron-forward" size={18} color={colors.grey} />
          </HStack>
        </Pressable>
        <Text>정보</Text>
        <VStack>
          <Pressable onPress={() => handleNavigateToTOS()}>
            <HStack
              backgroundColor={colors.actionColor}
              h="$10"
              px="$4"
              borderTopLeftRadius="$md"
              borderTopRightRadius="$md"
              borderBottomWidth="$1"
              borderBottomColor={colors.grey}
              justifyContent="space-between"
              alignItems="center"
              space="md"
            >
              <HStack space="md" alignItems="center">
                <Icon
                  name="information-circle"
                  size={18}
                  color={colors.themeWhite}
                />
                <Text fontWeight="$bold" color={colors.themeWhite}>
                  이용약관
                </Text>
              </HStack>
              <Icon name="chevron-forward" size={18} color={colors.grey} />
            </HStack>
          </Pressable>
          <Pressable onPress={() => handleNavigateToPrivacy()}>
            <HStack
              backgroundColor={colors.actionColor}
              h="$10"
              px="$4"
              justifyContent="space-between"
              borderBottomRightRadius="$md"
              borderBottomLeftRadius="$md"
              alignItems="center"
              space="md"
            >
              <HStack space="md" alignItems="center">
                <Icon
                  name="information-circle"
                  size={18}
                  color={colors.themeWhite}
                />
                <Text fontWeight="$bold" color={colors.themeWhite}>
                  개인정보처리방침
                </Text>
              </HStack>
              <Icon name="chevron-forward" size={18} color={colors.grey} />
            </HStack>
          </Pressable>
        </VStack>
        <Button backgroundColor={colors.actionColor} mt="$4">
          <ButtonText color={colors.pink}>로그아웃</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  )
}
