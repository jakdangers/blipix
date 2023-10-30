import React from 'react'
import {
  Avatar,
  AvatarFallbackText,
  Box,
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonText,
  Heading,
  HStack,
  Switch,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { ArrowLeftIcon } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CommonActions } from '@react-navigation/native'
import { DateTimePicker, DateTimePickerMode } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import { colors, constants } from '../../../../utils/consts'
import { MainRootStackScreenProps } from '../../../../navigation/types'

export default function TaskCollaborateScreen({
  route,
  navigation,
}: MainRootStackScreenProps<'mainRootTaskCollaborate'>) {
  const [pixelParams, setPixelParams] = React.useState<PixelParams>({
    title: '',
    emoji: '✅',
    duration: constants.DAILY,
    startDate: new Date(),
    endDate: new Date(),
    week: [],
    plannedTime: new Date(),
    alarm: false,
    participants: [],
  })

  const handleMoveToMeMainScreen = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'main' }],
      })
    )
  }

  const handleChangeDuration = (duration: string) => {
    setPixelParams((prev) => {
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
    setPixelParams((prev) => {
      return {
        ...prev,
        startDate,
      }
    })
  }

  const handleChangeEndDate = (endDate: Date) => {
    setPixelParams((prev) => {
      return {
        ...prev,
        endDate,
      }
    })
  }

  const handleChangeWeek = (day: string) => {
    const findDay = pixelParams.week.includes(day)

    if (findDay) {
      setPixelParams((prev) => {
        return {
          ...prev,
          week: prev.week.filter((week) => week !== day),
        }
      })
      return
    }

    setPixelParams((prev) => {
      return {
        ...prev,
        week: [...prev.week, day],
      }
    })
  }

  const handleChangeTime = (time: Date) => {
    setPixelParams((prev) => {
      return {
        ...prev,
        plannedTime: time,
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
    setPixelParams((prev) => {
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
        <Box flex={7} alignItems="center">
          <Text fontWeight="$bold" fontSize="$xl" color={colors.themeWhite}>
            참여하기
          </Text>
        </Box>
        <Box flex={1} />
      </HStack>
      <ScrollView>
        <VStack px="$6" pt="$2" pb="$6" space="lg">
          <Text color="$white" fontWeight="$bold">
            픽셀명
          </Text>
          <Box
            w="$full"
            h="$10"
            backgroundColor={colors.actionColor}
            px="$4"
            rounded="$md"
            justifyContent="center"
          >
            <Text color={colors.themeWhite} fontWeight="$bold">
              🗓️ 효주랑 카페가기
            </Text>
          </Box>
          <Text color="$white" fontWeight="$bold">
            기간 🗓️
          </Text>
          <ButtonGroup space="lg">
            <Button
              flex={1}
              variant="solid"
              backgroundColor={
                pixelParams.duration === constants.DAILY
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
                pixelParams.duration === constants.PERIOD
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
          {pixelParams.duration === constants.PERIOD && (
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
                  value={pixelParams.startDate}
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
                  value={pixelParams.endDate}
                  dateTimeFormatter={handleTranslateDateFormat}
                  onChange={handleChangeEndDate}
                />
              </Box>
            </HStack>
          )}
          <Text color="$white" fontWeight="$bold">
            요일 📆
          </Text>
          <ButtonGroup space="xs">
            <Button
              flex={1}
              variant="solid"
              backgroundColor={
                pixelParams.week.includes(constants.MONDAY)
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
                pixelParams.week.includes(constants.TUESDAY)
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
                pixelParams.week.includes(constants.WEDNESDAY)
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
                pixelParams.week.includes(constants.THURSDAY)
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
                pixelParams.week.includes(constants.FRIDAY)
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
                pixelParams.week.includes(constants.SATURDAY)
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
                pixelParams.week.includes(constants.SUNDAY)
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
            시간 ⏱️
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
            value={pixelParams.plannedTime}
            mode="time"
            dateTimeFormatter={handleTranslateTimeFormat}
            onChange={handleChangeTime}
          />
          <Text color="$white" fontWeight="$bold">
            알림 ⏰
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
              value={pixelParams.alarm}
              onChange={() => handleChangeAlarm()}
            />
          </HStack>
          <Text color="$white" fontWeight="$bold">
            같이 하는 친구 🤝
          </Text>
          <HStack space="md" justifyContent="flex-start">
            <Avatar bgColor="$indigo600">
              <AvatarFallbackText>Ronald Richards</AvatarFallbackText>
            </Avatar>
            <VStack>
              <Heading size="sm" color={colors.themeWhite}>
                Ronald Richards
              </Heading>
              <Text size="sm" color={colors.themeWhite}>
                Nursing Assistant
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </ScrollView>
      <ButtonGroup>
        <Button
          flex={1}
          backgroundColor={colors.pink}
          onPress={() => console.log('dd')}
        >
          <ButtonText>수락</ButtonText>
        </Button>
        <Button
          flex={1}
          backgroundColor={colors.grey}
          onPress={() => console.log('dd')}
        >
          <ButtonText>거절</ButtonText>
        </Button>
      </ButtonGroup>
    </SafeAreaView>
  )
}
