import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Icon,
  Input,
  InputField,
  Pressable,
  Text,
  ThreeDotsIcon,
  VStack,
} from '@gluestack-ui/themed'
import { ArrowLeftIcon } from 'lucide-react-native'
import { MainRootStackScreenProps } from '../../../../navigation/types'
import { colors } from '../../../../utils/consts'

const regex = /^[가-힣a-zA-Z0-9]*$/

interface Group {
  name: string
  description: string
}

function validateGroup(group: Group) {
  if (group.name === '' || !regex.test(group.name)) {
    return false
  }

  return group.description !== ''
}

export default function GroupChallengeCreateScreen({
  route,
  navigation,
}: MainRootStackScreenProps<'mainRootGroupChallengeGroupCreate'>) {
  const [group, setGroup] = React.useState<Group>({
    name: '',
    description: '',
  })

  const handleGroupNameChange = (text: string) => {
    setGroup((prev) => ({ ...prev, name: text }))
  }

  const handleGroupDescriptionChange = (text: string) => {
    setGroup((prev) => ({ ...prev, description: text }))
  }

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
            그룹 생성하기
          </Text>
        </Box>
        <Box flex={1} />
      </HStack>
      <VStack mx="$4" space="md" pt="$4" flex={1}>
        <FormControl minWidth="$80">
          <FormControlLabel>
            <FormControlLabelText color={colors.themeWhite}>
              그룹명 (한글, 영문, 숫자만 가능)
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
              placeholder="그룹명"
              placeholderTextColor={colors.themeWhite}
              selectionColor={colors.themeWhite}
              color={colors.themeWhite}
              onChangeText={handleGroupNameChange}
            />
          </Input>
        </FormControl>
        <FormControl minWidth="$80">
          <FormControlLabel>
            <FormControlLabelText color={colors.themeWhite}>
              그룹 소개
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
              placeholder="그룹 소개"
              placeholderTextColor={colors.themeWhite}
              selectionColor={colors.themeWhite}
              color={colors.themeWhite}
              onChangeText={handleGroupDescriptionChange}
            />
          </Input>
        </FormControl>
      </VStack>
      <Button
        disabled={!validateGroup(group)}
        backgroundColor={validateGroup(group) ? colors.pink : colors.grey}
        // onPress={() => challengeMutation.mutate()}
      >
        <ButtonText>그룹 생성</ButtonText>
      </Button>
    </SafeAreaView>
  )
}
