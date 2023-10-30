import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  InputField,
  Input,
  VStack,
  FormControl,
  HStack,
  Button,
  ButtonText,
  Text,
  ButtonGroup,
  Box,
  Switch,
  ButtonIcon,
} from '@gluestack-ui/themed'
import EmojiPicker from 'rn-emoji-keyboard'
import { EmojiType } from 'rn-emoji-keyboard/lib/typescript/src/types'
import { DateTimePicker, DateTimePickerMode } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { ArrowLeftIcon } from 'lucide-react-native'
import { useMutation } from 'react-query'
import { useRecoilValue } from 'recoil'
import { colors, constants } from '../../../../utils/consts'
import { MainRootStackScreenProps } from '../../../../navigation/types'
import axiosInstance from '../../../../utils/api'
import { userAuthContextState } from '../../../../state/userAuthContext'

interface ChallengeRequest {
  userID: string
  title: string
  emoji: string
  duration: string
  startDate: Date
  endDate: Date
  planTime: Date
  alarm: boolean
  weekDay: string[]
  type: string
}

interface ChallengeResponse {
  challengeID: number
}

export default function ChallengeCreateScreen({
  route,
  navigation,
}: MainRootStackScreenProps<'mainRootChallengeCreate'>) {
  const { challengeType } = route.params
  const userAuthContext = useRecoilValue(userAuthContextState)
  const [challenge, setChallenge] = React.useState<ChallengeRequest>({
    title: '',
    emoji: '✅',
    duration: constants.DAILY,
    startDate: new Date(new Date().setHours(0, 0, 0, 0)),
    endDate: new Date(new Date().setHours(0, 0, 0, 0)),
    planTime: new Date(new Date().setHours(0, 0, 0, 0)),
    alarm: false,
    type: challengeType,
    userID: userAuthContext.id,
    weekDay: [],
  })
  const [emojiOpen, setEmojiOpen] = React.useState<boolean>(false)

  const challengeMutation = useMutation({
    mutationFn: async () => {
      const planTime = new Date(
        Date.UTC(
          2000,
          0,
          1,
          challenge.planTime.getHours(),
          challenge.planTime.getMinutes(),
          0,
          0
        )
      )
      return axiosInstance
        .post<ChallengeResponse>('/challenges', {
          ...challenge,
          planTime,
        })
        .then((res) => res.data)
    },
    onSuccess: () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'main' }],
        })
      )
    },
  })

  const handleChangeEmoji = (emojiObject: EmojiType) => {
    setChallenge((prev) => {
      return {
        ...prev,
        emoji: emojiObject.emoji,
      }
    })
  }

  const handleChangeName = (name: string) => {
    setChallenge((prev) => {
      return {
        ...prev,
        title: name,
      }
    })
  }

  const handleChangeDuration = (duration: string) => {
    setChallenge((prev) => {
      return {
        ...prev,
        duration,
      }
    })
  }

  const handleTranslateDateFormat = (date: Date, mode: DateTimePickerMode) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷
    const day = String(date.getDate()).padStart(2, '0') // 일자를 2자리로 포맷

    return `${year}년 ${month}월 ${day}일`
  }

  const handleChangeStartDate = (startDate: Date) => {
    setChallenge((prev) => {
      return {
        ...prev,
        startDate,
      }
    })
  }

  const handleChangeEndDate = (endDate: Date) => {
    setChallenge((prev) => {
      return {
        ...prev,
        endDate,
      }
    })
  }

  const handleChangeWeek = (day: string) => {
    const findDay = challenge.weekDay.includes(day)

    if (findDay) {
      setChallenge((prev) => {
        return {
          ...prev,
          weekDay: prev.weekDay.filter((week) => week !== day),
        }
      })
      return
    }

    setChallenge((prev) => {
      return {
        ...prev,
        weekDay: [...prev.weekDay, day],
      }
    })
  }

  const handleChangeTime = (time: Date) => {
    setChallenge((prev) => {
      return {
        ...prev,
        planTime: time,
      }
    })
  }

  const handleTranslateTimeFormat = (time: Date, mode: DateTimePickerMode) => {
    let hours = time.getHours()
    const minute = String(time.getMinutes()).padStart(2, '0')
    const ampm = hours >= 12 ? '오후' : '오전'

    if (hours > 12) {
      hours -= 12
    }

    return `${String(hours).padStart(2, '0')}시 ${minute}분 ${ampm}`
  }

  const handleChangeAlarm = () => {
    setChallenge((prev) => {
      return {
        ...prev,
        alarm: !prev.alarm,
      }
    })
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
            챌린지 생성
          </Text>
        </Box>
        <Box flex={1} />
      </HStack>
      <ScrollView>
        <VStack px="$6" pt="$2" pb="$6" space="lg">
          <Text color="$white" fontWeight="$bold">
            챌린지 생성 정보
          </Text>
          <HStack w="$full" space="lg">
            <Button
              bgColor={colors.actionColor}
              onPress={() => setEmojiOpen((prev) => !prev)}
            >
              <ButtonText>{challenge.emoji}</ButtonText>
            </Button>
            <FormControl size="md" flex={1}>
              <Input backgroundColor={colors.actionColor} borderWidth={0}>
                <InputField
                  type="text"
                  placeholder="챌린지명"
                  color={colors.themeWhite}
                  placeholderTextColor={colors.themeWhite}
                  selectionColor={colors.themeWhite}
                  onChangeText={handleChangeName}
                  value={challenge.title}
                />
              </Input>
            </FormControl>
          </HStack>
          <Text color="$white" fontWeight="$bold">
            기간 설정 🗓️
          </Text>
          <ButtonGroup space="lg">
            <Button
              flex={1}
              variant="solid"
              backgroundColor={
                challenge.duration === constants.DAILY
                  ? colors.pink
                  : colors.actionColor
              }
              onPress={() => handleChangeDuration(constants.DAILY)}
            >
              <ButtonText fontSize="$sm" fontWeight="$bold">
                무제한
              </ButtonText>
            </Button>
            <Button
              flex={1}
              variant="solid"
              backgroundColor={
                challenge.duration === constants.PERIOD
                  ? colors.pink
                  : colors.actionColor
              }
              onPress={() => handleChangeDuration(constants.PERIOD)}
            >
              <ButtonText fontSize="$sm" fontWeight="$bold">
                특정 기간
              </ButtonText>
            </Button>
          </ButtonGroup>
          {challenge.duration === constants.PERIOD && (
            <HStack w="$full" space="lg">
              <Box flex={1}>
                <DateTimePicker
                  migrateTextField
                  containerStyle={{
                    padding: 15,
                    backgroundColor: colors.actionColor,
                    borderRadius: 4,
                    width: '100%',
                  }}
                  labelStyle={{
                    fontWeight: 'bold',
                    color: colors.themeWhite,
                  }}
                  placeholderTextColor={colors.themeWhite}
                  label="시작일"
                  placeholder="시작일을 선택하세요"
                  themeVariant="light"
                  style={{ color: colors.themeWhite, fontWeight: 'bold' }}
                  value={challenge.startDate}
                  dateTimeFormatter={handleTranslateDateFormat}
                  onChange={handleChangeStartDate}
                />
              </Box>
              <Box flex={1}>
                <DateTimePicker
                  migrateTextField
                  containerStyle={{
                    padding: 15,
                    backgroundColor: colors.actionColor,
                    width: '100%',
                    borderRadius: 4,
                  }}
                  labelStyle={{
                    fontWeight: 'bold',
                    color: colors.themeWhite,
                  }}
                  style={{ color: colors.themeWhite, fontWeight: 'bold' }}
                  placeholderTextColor={colors.themeWhite}
                  label="종료일"
                  placeholder="종료일을 선택하세요"
                  themeVariant="light"
                  value={challenge.endDate}
                  dateTimeFormatter={handleTranslateDateFormat}
                  onChange={handleChangeEndDate}
                />
              </Box>
            </HStack>
          )}
          <Text color="$white" fontWeight="$bold">
            요일 설정 📆
          </Text>
          <ButtonGroup space="xs">
            <Button
              flex={1}
              variant="solid"
              backgroundColor={
                challenge.weekDay.includes(constants.MONDAY)
                  ? colors.purple
                  : colors.actionColor
              }
              onPress={() => handleChangeWeek(constants.MONDAY)}
            >
              <ButtonText
                fontSize="$sm"
                fontWeight="$bold"
                width={12}
                color={colors.themeWhite}
              >
                월
              </ButtonText>
            </Button>
            <Button
              flex={1}
              variant="solid"
              backgroundColor={
                challenge.weekDay.includes(constants.TUESDAY)
                  ? colors.purple
                  : colors.actionColor
              }
              onPress={() => handleChangeWeek(constants.TUESDAY)}
            >
              <ButtonText
                fontSize="$sm"
                fontWeight="$bold"
                width={12}
                color={colors.themeWhite}
              >
                화
              </ButtonText>
            </Button>
            <Button
              flex={1}
              variant="solid"
              backgroundColor={
                challenge.weekDay.includes(constants.WEDNESDAY)
                  ? colors.purple
                  : colors.actionColor
              }
              onPress={() => handleChangeWeek(constants.WEDNESDAY)}
            >
              <ButtonText
                fontSize="$sm"
                fontWeight="$bold"
                width={12}
                color={colors.themeWhite}
              >
                수
              </ButtonText>
            </Button>
            <Button
              flex={1}
              variant="solid"
              backgroundColor={
                challenge.weekDay.includes(constants.THURSDAY)
                  ? colors.purple
                  : colors.actionColor
              }
              onPress={() => handleChangeWeek(constants.THURSDAY)}
            >
              <ButtonText
                fontSize="$sm"
                fontWeight="$bold"
                width={12}
                color={colors.themeWhite}
              >
                목
              </ButtonText>
            </Button>
            <Button
              flex={1}
              variant="solid"
              backgroundColor={
                challenge.weekDay.includes(constants.FRIDAY)
                  ? colors.purple
                  : colors.actionColor
              }
              onPress={() => handleChangeWeek(constants.FRIDAY)}
            >
              <ButtonText
                fontSize="$sm"
                fontWeight="$bold"
                width={12}
                color={colors.themeWhite}
              >
                금
              </ButtonText>
            </Button>
            <Button
              flex={1}
              variant="solid"
              backgroundColor={
                challenge.weekDay.includes(constants.SATURDAY)
                  ? colors.purple
                  : colors.actionColor
              }
              onPress={() => handleChangeWeek(constants.SATURDAY)}
            >
              <ButtonText
                fontSize="$sm"
                fontWeight="$bold"
                width={12}
                color={colors.themeWhite}
              >
                토
              </ButtonText>
            </Button>
            <Button
              flex={1}
              variant="solid"
              backgroundColor={
                challenge.weekDay.includes(constants.SUNDAY)
                  ? colors.purple
                  : colors.actionColor
              }
              onPress={() => handleChangeWeek(constants.SUNDAY)}
            >
              <ButtonText
                fontSize="$sm"
                fontWeight="$bold"
                width={12}
                color={colors.themeWhite}
              >
                일
              </ButtonText>
            </Button>
          </ButtonGroup>
          <Text color="$white" fontWeight="$bold">
            시간 설정 ⏱️
          </Text>
          <DateTimePicker
            migrateTextField
            containerStyle={{
              padding: 15,
              backgroundColor: colors.actionColor,
              width: '100%',
              borderRadius: 4,
            }}
            style={{
              color: colors.themeWhite,
              fontWeight: 'bold',
              textAlign: 'right',
            }}
            placeholderTextColor={colors.themeWhite}
            placeholder="시간을 선택하세요"
            themeVariant="light"
            value={challenge.planTime}
            mode="time"
            dateTimeFormatter={handleTranslateTimeFormat}
            onChange={handleChangeTime}
          />
          <Text color="$white" fontWeight="$bold">
            알림 설정 🔔
          </Text>
          <HStack
            w="$full"
            h={40}
            px="$4"
            backgroundColor={colors.actionColor}
            justifyContent="flex-end"
            alignItems="center"
            rounded="$sm"
          >
            <Switch
              size="md"
              isDisabled={false}
              trackColor={{
                true: colors.pink,
                false: colors.grey,
              }}
              value={challenge.alarm}
              onChange={() => handleChangeAlarm()}
            />
          </HStack>
        </VStack>
      </ScrollView>
      <EmojiPicker
        onEmojiSelected={handleChangeEmoji}
        open={emojiOpen}
        onClose={() => setEmojiOpen(false)}
        enableSearchBar
        theme={{
          backdrop: '#16161888',
          knob: colors.purple,
          container: '#282829',
          header: '#fff',
          skinTonesContainer: '#252427',
          category: {
            icon: colors.purple,
            iconActive: '#fff',
            container: '#252427',
            containerActive: colors.purple,
          },
          search: {
            text: '#fff',
            placeholder: '#fff',
          },
        }}
      />
      <Button
        disabled={challenge.title === ''}
        backgroundColor={challenge.title === '' ? colors.grey : colors.pink}
        onPress={() => challengeMutation.mutate()}
      >
        <ButtonText>챌린지 생성</ButtonText>
      </Button>
    </SafeAreaView>
  )
}
