import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  CloseIcon,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'lucide-react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import {
  GiphyDialog,
  GiphyMedia,
  GiphyDialogMediaSelectEventHandler,
  GiphyDialogEvent,
  GiphyMediaView,
} from '@giphy/react-native-sdk'
import { FlashList } from '@shopify/flash-list'
import { GiphyMediaData } from '@giphy/react-native-sdk/src/dto/giphyMedia'
import {
  MainRootStackScreenProps,
} from '../../../../navigation/types'
import { colors } from '../../../../utils/consts'
import PixelImage from './PixelImage'
import EmojiThread from './EmojiThread'

export interface Author {
  userID: string
  username: string
  fullName: string
}

export interface Thread {
  threadID: string
  giphyMedia: GiphyMedia
  author: Author
  createdAt: Date
}

export interface Pixel {
  pixelID: string
  frontImage: string
  backImage: string
  plannedTime: Date
  executedTime: Date
  threads: Thread[]
}

export default function TaskPixelDetailScreen({
  route,
  navigation,
}: MainRootStackScreenProps<'mainRootTaskPixelDetail'>) {
  // TODO : pixelID를 통해 픽셀 정보를 가져온다.
  const { historyID } = route.params
  const [media, setMedia] = useState<GiphyMedia | null>(null)

  // Handling GIFs selection in GiphyDialog
  useEffect(() => {
    const handler: GiphyDialogMediaSelectEventHandler = (e) => {
      setMedia(e.media)
      GiphyDialog.hide()
    }
    const listener = GiphyDialog.addListener(
      GiphyDialogEvent.MediaSelected,
      handler
    )
    return () => {
      listener.remove()
    }
  }, [])

  // TODO fetch pixel
  const pixel: Pixel = {
    pixelID: '1',
    frontImage:
      'https://image.msscdn.net/images/goods_img/20220329/2453552/2453552_1_500.jpg',
    backImage:
      'https://image.msscdn.net/images/goods_img/20220329/2453554/2453554_1_500.jpg',
    plannedTime: new Date(),
    executedTime: new Date(),
    threads: [
      {
        threadID: '1',
        author: {
          userID: '1',
          username: 'johndoe',
          fullName: 'John Doe',
        },
        giphyMedia: {
          id: 'VGgYOlDhvXtyo',
          isVideo: false,
          isDynamic: false,
          url: 'https://media4.giphy.com/media/VGgYOlDhvXtyo/200w.gif?cid=a0deb44cmfldmd4zgg73amnetwn6dgj2yfve2cifbohozzf3&rid=200w.gif&ct=g',
          aspectRatio: 1.0208333730697632,
          data: {} as GiphyMediaData,
        },
        createdAt: new Date(),
      },
    ],
  }

  const handleNavigateToBack = () => {
    navigation.goBack()
  }

  const handleRemoveGiphyMedia = () => setMedia(null)

  const renderThread = (item: Thread, index: number) => {
    const { length } = pixel.threads

    return (
      <EmojiThread
        giphyMedia={item.giphyMedia}
        author={item.author}
        createdAt={item.createdAt}
        isLast={index === length - 1}
      />
    )
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.themeBlack, paddingTop: 6 }}
    >
      <HStack
        backgroundColor={colors.themeBlack}
        borderColor={colors.borderColor}
        borderBottomWidth="$1"
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
            {`${'dd'}님의 픽셀`}
          </Text>
        </Box>
        <Box flex={1} />
      </HStack>
      <FlashList
        data={pixel.threads}
        renderItem={({ item, index }) => renderThread(item, index)}
        estimatedItemSize={200}
        ListHeaderComponent={
          <PixelImage
            frontImage={pixel.frontImage}
            backImage={pixel.backImage}
            completedTime={pixel.executedTime}
            validThread={pixel.threads.length > 0}
          />
        }
      />
      {media && (
        <VStack
          justifyContent="center"
          alignItems="center"
          pb="$4"
          borderTopWidth="$2"
          borderColor={colors.grey}
        >
          <HStack w="$full" justifyContent="flex-end">
            <Button
              w="20%"
              backgroundColor={colors.themeBlack}
              onPress={() => handleRemoveGiphyMedia()}
            >
              <ButtonIcon as={CloseIcon} size="xl" />
            </Button>
          </HStack>
          <Box width={wp('60%')} aspectRatio={media.aspectRatio}>
            <GiphyMediaView
              media={media}
              style={{ aspectRatio: media.aspectRatio }}
            />
          </Box>
        </VStack>
      )}
      <Button
        backgroundColor={media ? colors.pink : colors.purple}
        onPress={
          media ? () => console.log('보내기 액션') : () => GiphyDialog.show()
        }
      >
        <ButtonText>{media ? '이모티콘 보내기' : '이모티콘 선택'}</ButtonText>
      </Button>
    </SafeAreaView>
  )
}
