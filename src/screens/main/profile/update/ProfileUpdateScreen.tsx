import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Avatar,
  AvatarFallbackText,
  Box,
  Button,
  ButtonIcon, ButtonText,
  Center,
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Icon,
  Input,
  InputField,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { ArrowLeftIcon } from 'lucide-react-native'
import { colors } from '../../../../utils/consts'
import { MainRootStackScreenProps } from '../../../../navigation/types'

export default function ProfileUpdateScreen({
  route,
  navigation,
}: MainRootStackScreenProps<'mainRootProfileUpdate'>) {
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
        <Box flex={7} alignItems="center">
          <Text fontWeight="$bold" fontSize="$xl" color={colors.themeWhite}>
            프로필 수정
          </Text>
        </Box>
        <Box flex={1} />
      </HStack>
      <Center
        backgroundColor={colors.actionColor}
        mx="$4"
        py="$6"
        rounded="$md"
      >
        <Avatar bgColor="$indigo600" size="xl">
          <AvatarFallbackText>Ronald Richards</AvatarFallbackText>
        </Avatar>
      </Center>
      <VStack mx="$4" space="md" pt="$4" flex={1}>
        <FormControl minWidth="$80">
          <FormControlLabel>
            <FormControlLabelText color={colors.grey}>
              이름
            </FormControlLabelText>
          </FormControlLabel>
          <Input
            sx={{
              ':focus': {
                borderColor: colors.pink,
              },
            }}
          >
            <InputField
              placeholder="이름"
              placeholderTextColor={colors.themeWhite}
              selectionColor={colors.themeWhite}
              color={colors.themeWhite}
            />
          </Input>
        </FormControl>
        <FormControl minWidth="$80">
          <FormControlLabel>
            <FormControlLabelText color={colors.grey}>
              자기소개
            </FormControlLabelText>
          </FormControlLabel>
          <Input
            sx={{
              ':focus': {
                borderColor: colors.pink,
              },
            }}
          >
            <InputField
              placeholder="자기소개"
              placeholderTextColor={colors.themeWhite}
              selectionColor={colors.themeWhite}
              color={colors.themeWhite}
            />
          </Input>
        </FormControl>
      </VStack>
      <Button backgroundColor={colors.pink}>
        <ButtonText>수정하기</ButtonText>
      </Button>
    </SafeAreaView>
  )
}
