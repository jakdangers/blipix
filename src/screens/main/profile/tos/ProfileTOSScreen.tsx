import React from 'react'
import { Box, Button, ButtonIcon, HStack, Text } from '@gluestack-ui/themed'
import { ArrowLeftIcon } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'
import { colors } from '../../../../utils/consts'
import { MainRootStackScreenProps } from '../../../../navigation/types'

export default function ProfileTOSScreen({
  route,
  navigation,
}: MainRootStackScreenProps<'mainRootProfileTOS'>) {
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
            이용약관
          </Text>
        </Box>
        <Box flex={1} />
      </HStack>
      <WebView
        onMessage={() => console.log('dd')}
        source={{
          uri: 'https://www.notion.so/323b0604c2e64596b94136dd7db603c0?pvs=4',
        }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  )
}
