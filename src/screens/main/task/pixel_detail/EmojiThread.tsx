import React from 'react'
import {
  Avatar,
  AvatarFallbackText,
  Box,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { GiphyMedia, GiphyMediaView } from '@giphy/react-native-sdk'
import { colors, constants } from '../../../../utils/consts'
import { KrTimeFrom } from '../../../../utils/funcs'

interface AuthorProps {
  userID: string
  username: string
  fullName: string
}

interface EmojiThreadProps {
  giphyMedia: GiphyMedia
  author: AuthorProps
  createdAt: Date
  isLast: boolean
}

export default function EmojiThread({
  author,
  giphyMedia,
  createdAt,
  isLast,
}: EmojiThreadProps) {
  return (
    <VStack
      mx="$4"
      px="$4"
      pt="$4"
      mb={isLast ? '$4' : '$0'}
      borderBottomRightRadius={isLast ? '$md' : '$none'}
      borderBottomLeftRadius={isLast ? '$md' : '$none'}
      justifyContent="space-between"
      backgroundColor={colors.actionColor}
    >
      <HStack space="md">
        <Avatar bgColor="$amber600" size="md" borderRadius="$full">
          <AvatarFallbackText>{author.username}</AvatarFallbackText>
        </Avatar>
        <Text color={colors.themeWhite}>{author.fullName}</Text>
        <Text color={colors.themeWhite}>
          {KrTimeFrom(createdAt, constants.AMPM_HH_MM_SS)}
        </Text>
      </HStack>
      <Box aspectRatio={giphyMedia.aspectRatio} pl="$16">
        <GiphyMediaView
          media={giphyMedia}
          style={{ aspectRatio: giphyMedia.aspectRatio }}
          testID={`gph-media-view-${giphyMedia.id}`}
        />
      </Box>
    </VStack>
  )
}
