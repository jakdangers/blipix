import React, { useState } from 'react'
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  Button,
  ButtonText,
  HStack,
  Text,
  VStack,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetIcon,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  Heading,
  AlertDialogBody,
  ButtonGroup,
  AlertDialogFooter,
  Center,
  Pressable,
} from '@gluestack-ui/themed'
import moment from 'moment-timezone'
import { Trash2 } from 'lucide-react-native'
import { colors, constants } from '../../../../utils/consts'
import { Mission } from './types'
import WeekDayBadge from './WeekDayBadge'

interface TaskCardProps {
  mission: Mission
  last: boolean
  navigateToTaskUpdate: () => void
}

export default function TaskCard({
  mission,
  last,
  navigateToTaskUpdate,
}: TaskCardProps) {
  const [showActionsheet, setShowActionsheet] = useState(false)
  const [showAlertDialog, setShowAlertDialog] = useState(false)

  const handleClose = () => setShowActionsheet(!showActionsheet)

  const handleNavigateToTaskUpdate = () => {
    handleClose()
    navigateToTaskUpdate()
  }

  const handleDeleteTask = () => {
    handleClose()
    setShowAlertDialog(true)
  }

  console.log(mission.weekDay)

  return (
    <>
      <Pressable onPress={handleClose}>
        <VStack
          rounded="$md"
          backgroundColor={colors.actionColor}
          mx="$4"
          mt="$4"
          p="$6"
          mb={last ? '$4' : '$0'}
          space="lg"
        >
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontWeight="$bold" fontSize="$xl" color={colors.themeWhite}>
              {`${mission.emoji} ${mission.title}`}
            </Text>
            <Text fontWeight="$bold" fontSize="$md" color={colors.themeWhite}>
              {`${moment(mission.planTime).format('LT')} 🔕`}
            </Text>
          </HStack>
          <HStack justifyContent="flex-end">
            {mission.duration === constants.DAILY ? (
              <Text>매일 진행</Text>
            ) : (
              <Text color={colors.themeWhite}>{`${moment(mission.startDate)
                .format('L')
                .slice(0, 10)} - ${moment(mission.endDate)
                .format('L')
                .slice(0, 10)}`}</Text>
            )}
          </HStack>
          <WeekDayBadge weekDay={mission.weekDay} />
        </VStack>
      </Pressable>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent zIndex={999} backgroundColor={colors.actionColor}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={() => handleDeleteTask()}>
            <ActionsheetIcon as={Trash2} size="xl" color={colors.themeWhite} />
            <ActionsheetItemText color={colors.themeWhite}>
              삭제하기
            </ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
      <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => {
          setShowAlertDialog(false)
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent backgroundColor={colors.actionColor}>
          <AlertDialogHeader justifyContent="center">
            <Heading
              size="lg"
              color={colors.themeWhite}
            >{`${mission.title} 픽셀 삭제`}</Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Center>
              <Text
                size="sm"
                color={colors.themeWhite}
              >{`정말로 ${mission.title} 삭제하시겠어요?`}</Text>
            </Center>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup>
              <Button
                flex={1}
                variant="outline"
                borderColor={colors.grey}
                onPress={() => {
                  setShowAlertDialog(false)
                }}
              >
                <ButtonText color={colors.purple}>취소</ButtonText>
              </Button>
              <Button
                flex={1}
                variant="outline"
                borderColor={colors.grey}
                onPress={() => {
                  setShowAlertDialog(false)
                }}
              >
                <ButtonText color={colors.purple}>확인</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
