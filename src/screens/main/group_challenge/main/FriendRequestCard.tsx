import React, { useState } from 'react'
import {
  Avatar,
  AvatarFallbackText,
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonText,
  Heading,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { colors } from '../../../../utils/consts'

export default function FriendRequestCard() {
  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      mt="$4"
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
      <ButtonGroup space="md">
        <Button backgroundColor={colors.pink} size="xs">
          <ButtonText>수락</ButtonText>
        </Button>
        <Button backgroundColor={colors.grey} size="xs">
          <ButtonText>거절</ButtonText>
        </Button>
      </ButtonGroup>
    </HStack>
  )
}
