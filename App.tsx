import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { StatusBar } from 'react-native'
import { config, GluestackUIProvider } from '@gluestack-ui/themed'
import {
  GiphyClipsRendition,
  GiphyDialog,
  GiphySDK,
  GiphyContentType,
  GiphyDialogConfig,
  GiphyFileExtension,
  GiphyRating,
  GiphyRendition,
  GiphyStickersColumnCount,
  GiphyThemePreset,
} from '@giphy/react-native-sdk'
import { Provider as PaperProvider } from 'react-native-paper'
import AppNavigator from './src/navigation/AppNavigator'

// Configure API keys
GiphySDK.configure({ apiKey: 'APxR3ord06lswB4m2oplqpuWA4x08UXm' })

export const DEFAULT_DIALOG_SETTINGS: Required<GiphyDialogConfig> = {
  clipsPreviewRenditionType: GiphyClipsRendition.FixedWidth,
  confirmationRenditionType: GiphyRendition.FixedWidth,
  enableDynamicText: false,
  fileType: GiphyFileExtension.GIF,
  mediaTypeConfig: [GiphyContentType.Gif],
  rating: GiphyRating.PG13,
  renditionType: GiphyRendition.FixedWidth,
  selectedContentType: GiphyContentType.Gif,
  shouldLocalizeSearch: false,
  showCheckeredBackground: false,
  showConfirmationScreen: false,
  showSuggestionsBar: true,
  stickerColumnCount: GiphyStickersColumnCount.Three,
  theme: GiphyThemePreset.Dark,
  trayHeightMultiplier: 0.7,
}

GiphyDialog.configure(DEFAULT_DIALOG_SETTINGS)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
    mutations: {
      retry: 0,
    },
  },
})

function App() {
  StatusBar.setBarStyle('light-content')

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider config={config.theme}>
          <PaperProvider>
            <SafeAreaProvider>
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
            </SafeAreaProvider>
          </PaperProvider>
        </GluestackUIProvider>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default App
