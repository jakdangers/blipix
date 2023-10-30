import React, { useState } from 'react'
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetIcon,
  ActionsheetItem,
  ActionsheetItemText,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Avatar,
  AvatarFallbackText,
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonText,
  Center,
  Heading,
  HStack, Icon, Pressable,
  Text,
  ThreeDotsIcon,
  VStack,
} from '@gluestack-ui/themed'
import { Trash2 } from 'lucide-react-native'
import { colors } from '../../../../utils/consts'

export default function FriendCard() {
  const [showActionsheet, setShowActionsheet] = useState(false)
  const [showAlertDialog, setShowAlertDialog] = useState(false)

  const handleClose = () => setShowActionsheet(!showActionsheet)

  const handleDeleteTask = () => {
    handleClose()
    setShowAlertDialog(true)
  }

  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      mt="$4"
      mx="$4"
      rounded="$md"
    >
      <HStack space="md">
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
      <Pressable backgroundColor={colors.themeBlack} onPress={handleClose}>
        <Icon as={ThreeDotsIcon} size="xl" color={colors.themeWhite} />
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
            >{`${'님자'} 친구를 삭제`}</Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Center>
              <Text
                size="sm"
                color={colors.themeWhite}
              >{`정말로 ${'님자'} 삭제하시겠어요?`}</Text>
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
    </HStack>
  )
}
