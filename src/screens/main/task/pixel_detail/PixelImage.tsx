import React from 'react'
import {
  Box,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import moment from 'moment-timezone'
import { colors } from '../../../../utils/consts'

export interface PixelImageProps {
  frontImage: string
  backImage: string
  completedTime: Date
  validThread: boolean
}

export default function PixelImage({
  frontImage,
  backImage,
  completedTime,
  validThread,
}: PixelImageProps) {
  const [selectType, setSelectType] = React.useState<string>('front')
  const [selectedImage, setSelectedImage] = React.useState<string>(frontImage)

  const handleSelectType = (type: string) => {
    setSelectType(type)
    setSelectedImage(type === 'front' ? frontImage : backImage)
  }

  return (
    <VStack pt="$4" space="md">
      <VStack alignItems="center" space="lg">
        <Text fontWeight="$bold" color={colors.themeWhite}>
          {moment(completedTime).format('llll')}
        </Text>
        <Image
          w={wp('90%')}
          h={hp('62%')}
          borderColor={colors.themeWhite}
          borderWidth="$2"
          rounded="$md"
          source={{ uri: selectedImage }}
          alt="dd"
          resizeMode="cover"
        />
      </VStack>
      <HStack
        space="lg"
        justifyContent="center"
        alignItems="center"
        h={hp('10%')}
      >
        <Pressable onPress={() => handleSelectType('front')}>
          <Image
            rounded="$md"
            w={selectType === 'front' ? '$12' : '$10'}
            h={selectType === 'front' ? '$12' : '$10'}
            opacity={selectType === 'front' ? 1 : 0.5}
            borderWidth={selectType === 'front' ? '$2' : '$0'}
            borderColor={colors.themeWhite}
            source={{ uri: frontImage }}
            resizeMode="cover"
            alt="dd"
          />
        </Pressable>
        <Pressable onPress={() => handleSelectType('back')}>
          <Image
            rounded="$md"
            w={selectType === 'back' ? '$12' : '$10'}
            h={selectType === 'back' ? '$12' : '$10'}
            opacity={selectType === 'back' ? 1 : 0.5}
            borderWidth={selectType === 'back' ? '$2' : '$0'}
            borderColor={colors.themeWhite}
            source={{ uri: backImage }}
            resizeMode="cover"
            alt="Image Error"
          />
        </Pressable>
      </HStack>
      {validThread && (
        <Box
          py="$4"
          mx="$4"
          alignItems="center"
          borderTopRightRadius="$md"
          borderTopLeftRadius="$md"
          backgroundColor={colors.actionColor}
          borderColor={colors.iconColor}
          borderBottomWidth={1}
        >
          <Text fontSize="$xl" fontWeight="$bold" color={colors.themeWhite}>
            이모티콘 쓰레드
          </Text>
        </Box>
      )}
    </VStack>
  )
}
